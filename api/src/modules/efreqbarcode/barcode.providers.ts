import { Provider } from '@nestjs/common';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CreateBarcodeWhenUserIsCreatedDomainEventHandler } from './application/event-handlers/create-barcode-when-user-is-created.domain-event-handler';

export const createBarcodeWhenUserIsCreatedProvider: Provider = {
  provide: CreateBarcodeWhenUserIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): CreateBarcodeWhenUserIsCreatedDomainEventHandler => {
    const eventHandler = new CreateBarcodeWhenUserIsCreatedDomainEventHandler(
      unitOfWork,
    );
    eventHandler.listen();
    return eventHandler;
  },
  inject: [UnitOfWork],
};
