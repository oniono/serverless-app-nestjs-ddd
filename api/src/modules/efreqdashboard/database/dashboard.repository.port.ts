import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { DashboardEntity, DashboardProps } from '../domain/entities/dashboard.entity';

export type DashboardRepositoryPort = RepositoryPort<DashboardEntity, DashboardProps>;
