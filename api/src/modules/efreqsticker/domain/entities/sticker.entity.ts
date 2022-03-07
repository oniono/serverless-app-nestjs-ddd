import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { StickerCreatedDomainEvent } from '../events/sticker-created.domain-event';

// Properties that are needed for a sticker creation
export interface StickerProps {
  freqDashboardId: string;
  missionStickerCount: number;
  normalStickerCount: number;
}

export class StickerEntity extends AggregateRoot<StickerProps> {
  protected readonly _id: UUID;

  static create(props: StickerProps): StickerEntity {
    const id = UUID.generate();
    
    const sticker = new StickerEntity({ id, props });
    /* adding "StickerCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action */
    sticker.addEvent(
      new StickerCreatedDomainEvent({
        aggregateId: id.value,
        freqDashboardId: props.freqDashboardId,
        missionStickerCount: props.missionStickerCount,
        normalStickerCount: props.normalStickerCount,
      }),
    );
    return sticker;
  }

  someBusinessLogic(): void {
    // TODO: add example business logic
  }

  validate(): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
