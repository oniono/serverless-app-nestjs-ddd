import { TypeormUnitOfWork } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { UserOrmEntity } from '@src/modules/efrequser/infrastructure/database/user.orm-entity';
import { UserRepository } from '@src/modules/efrequser/infrastructure/database/user.repository';
import { BarcodeOrmEntity } from '@src/modules/efreqbarcode/infrastructue/database/barcode.orm-entity';
import { BarcodeRepository } from '@src/modules/efreqbarcode/infrastructue/database/barcode.repository';
import { DashboardOrmEntity } from '@src/modules/efreqdashboard/database/dashboard.orm-entity';
import { DashboardRepository } from '@src/modules/efreqdashboard/database/dashboard.repository';
import { StickerOrmEntity } from '@src/modules/efreqsticker/infrastructure/database/sticker.orm-entity';
import { StickerRepository } from '@src/modules/efreqsticker/infrastructure/database/sticker.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  // Add new repositories below to use this generic UnitOfWork

  // Convert TypeOrm Repository to a Domain Repository
  getUserRepository(correlationId: string): UserRepository {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getBarcodeRepository(correlationId: string): BarcodeRepository {
    return new BarcodeRepository(
      this.getOrmRepository(BarcodeOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getDashboardRepository(correlationId: string): DashboardRepository {
    return new DashboardRepository(
      this.getOrmRepository(DashboardOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }  

  getStickerRepository(correlationId: string): StickerRepository {
    return new StickerRepository(
      this.getOrmRepository(StickerOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }    
}
