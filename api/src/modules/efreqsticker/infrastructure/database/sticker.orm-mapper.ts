import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { StickerEntity, StickerProps } from '../../domain/entities/sticker.entity';
import { StickerOrmEntity } from './sticker.orm-entity';

export class StickerOrmMapper extends OrmMapper<StickerEntity, StickerOrmEntity> {
  protected toOrmProps(entity: StickerEntity): OrmEntityProps<StickerOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<StickerOrmEntity> = {
      freqDashboardId: props.freqDashboardId,
      normalStickerCount: props.normalStickerCount,
      missionStickerCount: props.missionStickerCount,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: StickerOrmEntity): EntityProps<StickerProps> {
    const id = new UUID(ormEntity.id);
    const props: StickerProps = {
      freqDashboardId: ormEntity.freqDashboardId,
      normalStickerCount: ormEntity.normalStickerCount,
      missionStickerCount: ormEntity.missionStickerCount,
    };
    return { id, props };
  }
}
