import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events';

// DomainEvent is a plain object with properties
export class StickerSentDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<StickerSentDomainEvent>) {
    super(props);
    this.freqDashboardId = props.freqDashboardId; 
    this.missionStickerCount = props.missionStickerCount;
    this.normalStickerCount = props.normalStickerCount;
  }

  readonly freqDashboardId: string;

  readonly missionStickerCount: number;

  readonly normalStickerCount: number;
}
