import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { DashboardEntity, DashboardProps } from '../domain/entities/dashboard.entity';
import { Summary } from '../domain/value-objects/summary.value-object';
import { DashboardOrmEntity } from './dashboard.orm-entity';

export class DashboardOrmMapper extends OrmMapper<DashboardEntity, DashboardOrmEntity> {
  protected toOrmProps(entity: DashboardEntity): OrmEntityProps<DashboardOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<DashboardOrmEntity> = {
      userId: props.userId,
      balance: props.balance,
      panCount: props.summary.freqCompletedPanCount,
      missionStickerCount: props.summary.totalMissionStickerCount,
      normalStickerCount: props.summary.totalNormalStickerCount
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: DashboardOrmEntity,
  ): EntityProps<DashboardProps> {
    const id = new UUID(ormEntity.id);
    const props: DashboardProps = {
      userId: ormEntity.userId,
      balance: ormEntity.balance,
      summary: new Summary({
        freqCompletedPanCount: ormEntity.panCount,
        totalMissionStickerCount: ormEntity.missionStickerCount,
        totalNormalStickerCount: ormEntity.normalStickerCount
      }),
    };
    return { id, props };
  }
}
