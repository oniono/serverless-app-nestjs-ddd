import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { StickerOrmEntity } from './infrastructure/database/sticker.orm-entity';
import { StickerRepository } from './infrastructure/database/sticker.repository';
import { CreateStickerHttpController } from './interface/create-sticker.http.controller';
import { DeleteStickerHttpController } from './interface/delete-sticker.http-controller';
import { CreateStickerMessageController } from './interface/create-sticker.message.controller';
import { CreateStickerService } from './application/commands/create-sticker/create-sticker.service';
import { DeleteStickerService } from './application/commands/delete-sticker/delete-sticker.service';
import { createStickerCliLoggerProvider } from './sticker.providers';

const httpControllers = [
  CreateStickerHttpController,
  DeleteStickerHttpController,
];

const messageControllers = [CreateStickerMessageController];

const repositories = [StickerRepository];

const commandHandlers = [CreateStickerService, DeleteStickerService];

@Module({
  imports: [TypeOrmModule.forFeature([StickerOrmEntity]), CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    ...repositories,
    ...commandHandlers,
    createStickerCliLoggerProvider,
  ],
})
export class StickerModule {}
