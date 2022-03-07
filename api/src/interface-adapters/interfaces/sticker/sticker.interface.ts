import { ModelBase } from '../../../libs/ddd/interface-adapters/interfaces/model.base.interface';

export interface Sticker extends ModelBase {
  freqDashboardId: string;
  missionStickerCount: number;
  normalStickerCount: number;
}
