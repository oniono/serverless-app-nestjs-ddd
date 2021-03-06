import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { UserRepositoryPort } from '@src/modules/efrequser/infrastructure/database/user.repository.port';
import { Address } from '@src/modules/efrequser/domain/value-objects/address.value-object';
import { Email } from '@src/modules/efrequser/domain/value-objects/email.value-object';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base';
import { CreateUserCommand } from './create-user.command';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../../errors/user.errors';

@CommandHandler(CreateUserCommand)
export class CreateUserService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateUserCommand,
  ): Promise<Result<ID, UserAlreadyExistsError>> {
    /* Use a repository provided by UnitOfWork to include everything 
       (including changes caused by Domain Events) into one 
       atomic database transaction */
    const userRepo: UserRepositoryPort = this.unitOfWork.getUserRepository(
      command.correlationId,
    );
    // user uniqueness guard
    if (await userRepo.exists(command.email)) {
      /** Returning an Error instead of throwing it
       *  so a controller can handle it explicitly */
      return Result.err(new UserAlreadyExistsError());
    }

    const user = UserEntity.create({
      email: new Email(command.email),
      address: new Address({
        city: command.city,
        postalCode: command.postalCode,
        street: command.street,
      }),
    });

    user.someBusinessLogic();

    const created = await userRepo.save(user);
    return Result.ok(created.id);
  }
}
