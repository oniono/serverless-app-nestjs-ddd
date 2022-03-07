import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
  StickerEntity,
  StickerProps,
} from '@src/modules/efreqsticker/domain/entities/sticker.entity';
import { NotFoundException } from '@libs/exceptions';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util';
import { StickerOrmEntity } from './sticker.orm-entity';
import { StickerRepositoryPort } from './sticker.repository.port';
import { StickerOrmMapper } from './sticker.orm-mapper';

@Injectable()
export class StickerRepository
  extends TypeormRepositoryBase<StickerEntity, StickerProps, StickerOrmEntity>
  implements StickerRepositoryPort {
  protected relations: string[] = [];

  constructor(
    @InjectRepository(StickerOrmEntity)
    private readonly stickerRepository: Repository<StickerOrmEntity>,
  ) {
    super(
      stickerRepository,
      new StickerOrmMapper(StickerEntity, StickerOrmEntity),
      new Logger('StickerRepository'),
    );
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<StickerProps>,
  ): WhereCondition<StickerOrmEntity> {
    const where: QueryParams<StickerOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
