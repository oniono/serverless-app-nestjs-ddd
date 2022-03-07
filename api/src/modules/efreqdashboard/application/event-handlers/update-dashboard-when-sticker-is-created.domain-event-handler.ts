import { StickerCreatedDomainEvent } from '@src/modules/efreqsticker/domain/events/sticker-created.domain-event';
import { DashboardRepositoryPort } from '@src/modules/efreqdashboard/database/dashboard.repository.port';
import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
export class UpdateDashboardWhenStickerIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(StickerCreatedDomainEvent);
  }

  // Handle a Domain Event by perform changes to other aggregates (inside the same Domain).
  async handle(event: StickerCreatedDomainEvent): Promise<void> {
    const dashboardRepo: DashboardRepositoryPort = this.unitOfWork.getDashboardRepository(
      event.correlationId,
    );

    const dashboard = await dashboardRepo.findOneByIdOrThrow(event.freqDashboardId);

    dashboard.update({
      missionStickerCount: event.missionStickerCount,
      normalStickerCount: event.normalStickerCount,
    });

    await dashboardRepo.save(dashboard);
  }
}
