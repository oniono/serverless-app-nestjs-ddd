import { UserCreatedDomainEvent } from '@src/modules/efrequser/domain/events/user-created.domain-event';
import { BarcodeRepositoryPort } from '@src/modules/efreqbarcode/infrastructue/database/barcode.repository.port';
import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { BarcodeEntity } from '../../domain/entities/barcode.entity';

export class CreateBarcodeWhenUserIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(UserCreatedDomainEvent);
  }

  // Handle a Domain Event by perform changes to other aggregates (inside the same Domain).
  async handle(event: UserCreatedDomainEvent): Promise<void> {
    const barcodeRepo: BarcodeRepositoryPort = this.unitOfWork.getBarcodeRepository(
      event.correlationId,
    );
    const barcode = BarcodeEntity.create({
      userId: new UUID(event.aggregateId),
    });
    await barcodeRepo.save(barcode);
  }
}
