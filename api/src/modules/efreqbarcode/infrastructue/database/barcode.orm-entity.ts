import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('efreqbarcode')
export class BarcodeOrmEntity extends TypeormEntityBase {
  constructor(props?: BarcodeOrmEntity) {
    super(props);
  }

  @Column({ default: 0 })
  freqBarcodeNo: string;

  @Column({ unique: true })
  userId: string;
}
