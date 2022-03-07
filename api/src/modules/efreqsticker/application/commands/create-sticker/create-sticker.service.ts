import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { StickerRepositoryPort } from '@src/modules/efreqsticker/infrastructure/database/sticker.repository.port';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base';
import { CreateStickerCommand } from './create-sticker.command';
import { StickerEntity } from '../../../domain/entities/sticker.entity';
import { StickerAlreadyExistsError } from '../../../errors/sticker.errors';

@CommandHandler(CreateStickerCommand)
export class CreateStickerService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateStickerCommand,
  ): Promise<Result<ID>> {
    /* Use a repository provided by UnitOfWork to include everything 
       (including changes caused by Domain Events) into one 
       atomic database transaction */
    const stickerRepo: StickerRepositoryPort = this.unitOfWork.getStickerRepository(
      command.correlationId,
    );

    // todo : 스티커 중복 추가를 방지하기 위해 어떤 키로 확인해야 하는가?
    const sticker = StickerEntity.create({
      freqDashboardId: command.freqDashboardId,
      missionStickerCount: command.missionStickerCount,
      normalStickerCount: command.normalStickerCount,
    });

    sticker.someBusinessLogic();

    const created = await stickerRepo.save(sticker);
    return Result.ok(created.id);
  }
}
