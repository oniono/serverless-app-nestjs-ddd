import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { DashboardOrmEntity } from './dashboard.orm-entity';
import { DashboardEntity, DashboardProps } from '../domain/entities/dashboard.entity';
import { DashboardRepositoryPort } from './dashboard.repository.port';
import { DashboardOrmMapper } from './dashboard.orm-mapper';

@Injectable()
export class DashboardRepository
  extends TypeormRepositoryBase<DashboardEntity, DashboardProps, DashboardOrmEntity>
  implements DashboardRepositoryPort {
  protected relations: string[] = [];

  constructor(
    @InjectRepository(DashboardOrmEntity)
    private readonly dashboardRepository: Repository<DashboardOrmEntity>,
  ) {
    super(
      dashboardRepository,
      new DashboardOrmMapper(DashboardEntity, DashboardOrmEntity),
      new Logger('DashboardRepository'),
    );
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<DashboardProps>,
  ): WhereCondition<DashboardOrmEntity> {
    const where: QueryParams<DashboardOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
