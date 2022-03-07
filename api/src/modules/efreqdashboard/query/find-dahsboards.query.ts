import { Query } from '@libs/ddd/domain/base-classes/query-handler.base';

// Query is a plain object with properties
export class FindDashboardsQuery extends Query {
  constructor(props: FindDashboardsQuery) {
    super();
    this.freqDashboardId = props.freqDashboardId;
    this.missionStickerCount = props.missionStickerCount;
    this.normalStickerCount = props.normalStickerCount;
  }

  readonly freqDashboardId?: string;

  readonly missionStickerCount?: number;

  readonly normalStickerCount?: number;
}