import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateStickerCommand } from '../application/commands/create-sticker/create-sticker.command';
import { CreateStickerRequest } from './dtos/create-sticker.request.dto';

// If you are Using GraphQL you'll need a Resolver instead of a Controller

@Resolver()
export class CreateStickerGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdResponse)
  async create(@Args('input') input: CreateStickerRequest): Promise<IdResponse> {
    const command = new CreateStickerCommand(input);

    const id = await this.commandBus.execute(command);

    return new IdResponse(id.unwrap().value);
  }
}
