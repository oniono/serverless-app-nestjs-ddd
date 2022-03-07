import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { BarcodeOrmEntity } from './barcode.orm-entity';
import { BarcodeEntity, BarcodeProps } from '../../domain/entities/barcode.entity';
import { BarcodeRepositoryPort } from './barcode.repository.port';
import { BarcodeOrmMapper } from './barcode.orm-mapper';

@Injectable()
export class BarcodeRepository
  extends TypeormRepositoryBase<BarcodeEntity, BarcodeProps, BarcodeOrmEntity>
  implements BarcodeRepositoryPort {
  protected relations: string[] = [];

  constructor(
    @InjectRepository(BarcodeOrmEntity)
    private readonly barcodeRepository: Repository<BarcodeOrmEntity>,
  ) {
    super(
      barcodeRepository,
      new BarcodeOrmMapper(BarcodeEntity, BarcodeOrmEntity),
      new Logger('BarcodeRepository'),
    );
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<BarcodeProps>,
  ): WhereCondition<BarcodeOrmEntity> {
    const where: QueryParams<BarcodeOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
