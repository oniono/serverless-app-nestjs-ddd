import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events';

// DomainEvent is a plain object with properties
export class StickerCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<StickerCreatedDomainEvent>) {
    super(props);
    this.freqDashboardId = props.freqDashboardId; 
    this.missionStickerCount = props.missionStickerCount;
    this.normalStickerCount = props.normalStickerCount;
  }

  readonly freqDashboardId: string;

  readonly missionStickerCount: number;

  readonly normalStickerCount: number;
}
