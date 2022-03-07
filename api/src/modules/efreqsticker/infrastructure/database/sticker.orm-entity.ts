import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';
import { Column, Entity } from 'typeorm';

@Entity('efreqsticker')
export class StickerOrmEntity extends TypeormEntityBase {
  constructor(props?: StickerOrmEntity) {
    super(props);
  }

  @Column()
  freqDashboardId: string;
  
  @Column()
  normalStickerCount: number;

  @Column()
  missionStickerCount: number;
}
