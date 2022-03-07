import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardOrmEntity } from './database/dashboard.orm-entity';
import { DashboardRepository } from './database/dashboard.repository';
import { createDashboardWhenUserIsCreatedProvider, updateDashboardWhenStickerIsCreatedProvider } from './efrequency.providers';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardOrmEntity])],
  controllers: [],
  providers: [DashboardRepository, createDashboardWhenUserIsCreatedProvider, updateDashboardWhenStickerIsCreatedProvider],
})
export class EfrequencyModule {}
