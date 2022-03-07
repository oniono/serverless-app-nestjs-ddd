import { Controller, Delete, Param } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { DeleteStickerService } from '../application/commands/delete-sticker/delete-sticker.service';
import { DeleteStickerCommand } from '../application/commands/delete-sticker/delete-sticker.command';

@Controller(routesV1.version)
export class DeleteStickerHttpController {
  constructor(private readonly service: DeleteStickerService) {}

  @Delete(routesV1.sticker.delete)
  async deleteSticker(@Param('id') id: string): Promise<void> {
    const command = new DeleteStickerCommand({ stickerId: id });
    await this.service.execute(command);
  }
}
