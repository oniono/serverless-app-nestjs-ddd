import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateStickerCommand } from './create-sticker.command';
import { CreateStickerMessageRequest } from '../../../interface/dtos/create-sticker.request.dto';

@Controller()
export class CreateStickerMessageController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('sticker.create') // <- Subscribe to a microservice message
  async create(message: CreateStickerMessageRequest): Promise<IdResponse> {
    const command = new CreateStickerCommand(message);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}
