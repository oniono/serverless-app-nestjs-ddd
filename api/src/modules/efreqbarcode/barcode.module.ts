import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeOrmEntity } from './infrastructue/database/barcode.orm-entity';
import { BarcodeRepository } from './infrastructue/database/barcode.repository';
import { createBarcodeWhenUserIsCreatedProvider } from './barcode.providers';

@Module({
  imports: [TypeOrmModule.forFeature([BarcodeOrmEntity])],
  controllers: [],
  providers: [BarcodeRepository, createBarcodeWhenUserIsCreatedProvider],
})
export class BarcodeModule {}
