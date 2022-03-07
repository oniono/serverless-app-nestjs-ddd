import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestEventModule } from 'nest-event';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { typeormConfig } from './infrastructure/configs/ormconfig';
import { UnitOfWorkModule } from './infrastructure/database/unit-of-work/unit-of-work.module';
import { UserModule } from '@src/modules/efrequser/user.module';
import { BarcodeModule } from '@src/modules/efreqbarcode/barcode.module';
import { EfrequencyModule } from '@src/modules/efreqdashboard/efrequency.module';
import { StickerModule } from '@src/modules/efreqsticker/sticker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UnitOfWorkModule,
    NestEventModule,
    ConsoleModule,
    UserModule,
    BarcodeModule,
    EfrequencyModule,
    StickerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
