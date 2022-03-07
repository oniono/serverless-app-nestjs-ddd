import { StickerRepositoryPort } from '@src/modules/efreqsticker/infrastructure/database/sticker.repository.port';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { StickerRepository } from '../../../infrastructure/database/sticker.repository';
import { DeleteStickerCommand } from './delete-sticker.command';

@CommandHandler(DeleteStickerCommand)
export class DeleteStickerService {
  constructor(
    @Inject(StickerRepository)
    private readonly stickerRepo: StickerRepositoryPort,
  ) {}

  async execute(command: DeleteStickerCommand): Promise<void> {
    const found = await this.stickerRepo.findOneByIdOrThrow(command.stickerId);
    await this.stickerRepo.delete(found);
  }
}
