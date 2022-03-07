import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object';
import { ConflictException } from '@src/libs/exceptions';
import { CreateStickerCommand } from '../application/commands/create-sticker/create-sticker.command';
import { CreateStickerHttpRequest } from './dtos/create-sticker.request.dto';
import { StickerAlreadyExistsError } from '../errors/sticker.errors';

@Controller(routesV1.version)
export class CreateStickerHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.sticker.root)
  @ApiOperation({ summary: 'Create a sticker' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: StickerAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateStickerHttpRequest): Promise<IdResponse> {
    const command = new CreateStickerCommand(body);

    const result: Result<
      ID,
      StickerAlreadyExistsError
    > = await this.commandBus.execute(command);

    return result.unwrap(
      id => new IdResponse(id.value), // if ok return an id
      error => {
        // if error decide what to do with it
        if (error instanceof StickerAlreadyExistsError)
          throw new ConflictException(error.message);
        throw error;
      },
    );
  }
}
