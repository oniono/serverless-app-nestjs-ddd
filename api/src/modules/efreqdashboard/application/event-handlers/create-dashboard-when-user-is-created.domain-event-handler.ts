import { UserCreatedDomainEvent } from '@src/modules/efrequser/domain/events/user-created.domain-event';
import { DashboardRepositoryPort } from '@src/modules/efreqdashboard/database/dashboard.repository.port';
import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { DashboardEntity } from '../../domain/entities/dashboard.entity';

export class CreateDashboardWhenUserIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(UserCreatedDomainEvent);
  }

  // Handle a Domain Event by perform changes to other aggregates (inside the same Domain).
  async handle(event: UserCreatedDomainEvent): Promise<void> {
    const dashboardRepo: DashboardRepositoryPort = this.unitOfWork.getDashboardRepository(
      event.correlationId,
    );
    const dashboard = DashboardEntity.create({
      userId: event.aggregateId,
    });
    await dashboardRepo.save(dashboard);
  }
}
