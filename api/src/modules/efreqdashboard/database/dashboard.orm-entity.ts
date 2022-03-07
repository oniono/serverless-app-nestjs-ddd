import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('efreqdashboard')
export class DashboardOrmEntity extends TypeormEntityBase {
  constructor(props?: DashboardOrmEntity) {
    super(props);
  }

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  panCount: number;

  @Column({ default: 0 })
  missionStickerCount: number;

  @Column({ default: 0 })
  normalStickerCount: number;

  @Column({ unique: true })
  userId: string;
}
