import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { BarcodeEntity, BarcodeProps } from '../../domain/entities/barcode.entity';
import { BarcodeOrmEntity } from './barcode.orm-entity';

export class BarcodeOrmMapper extends OrmMapper<BarcodeEntity, BarcodeOrmEntity> {
  protected toOrmProps(entity: BarcodeEntity): OrmEntityProps<BarcodeOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<BarcodeOrmEntity> = {
      userId: props.userId.value,
      freqBarcodeNo: props.freqBarcodeNo,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: BarcodeOrmEntity,
  ): EntityProps<BarcodeProps> {
    const id = new UUID(ormEntity.id);
    const props: BarcodeProps = {
      userId: new UUID(ormEntity.userId),
      freqBarcodeNo: ormEntity.freqBarcodeNo,
    };
    return { id, props };
  }
}
