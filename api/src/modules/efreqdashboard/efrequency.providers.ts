import { Provider } from '@nestjs/common';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CreateDashboardWhenUserIsCreatedDomainEventHandler } from './application/event-handlers/create-dashboard-when-user-is-created.domain-event-handler';
import { UpdateDashboardWhenStickerIsCreatedDomainEventHandler } from './application/event-handlers/update-dashboard-when-sticker-is-created.domain-event-handler';

export const createDashboardWhenUserIsCreatedProvider: Provider = {
  provide: CreateDashboardWhenUserIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): CreateDashboardWhenUserIsCreatedDomainEventHandler => {
    const eventHandler = new CreateDashboardWhenUserIsCreatedDomainEventHandler(
      unitOfWork,
    );
    eventHandler.listen();
    return eventHandler;
  },
  inject: [UnitOfWork],
};

export const updateDashboardWhenStickerIsCreatedProvider: Provider = {
  provide: UpdateDashboardWhenStickerIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): UpdateDashboardWhenStickerIsCreatedDomainEventHandler => {
    const eventHandler = new UpdateDashboardWhenStickerIsCreatedDomainEventHandler(
      unitOfWork,
    );
    eventHandler.listen();
    return eventHandler;
  },
  inject: [UnitOfWork],
};
