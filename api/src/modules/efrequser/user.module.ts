import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserOrmEntity } from './infrastructure/database/user.orm-entity';
import { UserRepository } from './infrastructure/database/user.repository';
import { CreateUserHttpController } from './interface/create-user.http.controller';
import { DeleteUserHttpController } from './interface/delete-user.http-controller';
import { FindUsersHttpController } from './interface/find-users.http.controller';
import { CreateUserMessageController } from './interface/create-user.message.controller';
import { CreateUserService } from './application/commands/create-user/create-user.service';
import { DeleteUserService } from './application/commands/delete-user/delete-user.service';
import { FindUsersQueryHandler } from './application/queries/find-users/find-users.query-handler';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  FindUsersHttpController,
];

const messageControllers = [CreateUserMessageController];

const repositories = [UserRepository];

const commandHandlers = [CreateUserService, DeleteUserService];

const queryHandlers = [FindUsersQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
