import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { min } from 'class-validator';
import { ArgumentOutOfRangeError } from 'rxjs';
import { UpdateStickerProps } from '../entities/dashboard.types';

/** Note: Every property in address Value Object can be
 * it's own Value Object if needed.
 * Value Objects with multiple properties can contain
 * other Value Objects inside.
 * */

export interface SummaryProps {
  freqCompletedPanCount: number;
  totalNormalStickerCount: number;
  totalMissionStickerCount: number;
}

export class Summary extends ValueObject<SummaryProps> {
  update(addStickerToSummary: UpdateStickerProps) {
    const newTotalMissionSticker = this.totalMissionStickerCount + addStickerToSummary.missionStickerCount;
    const newTotalNormalSticker = this.totalNormalStickerCount + addStickerToSummary.normalStickerCount;

    const newTotalCompletedPanCount = Math.floor(Math.min(newTotalMissionSticker / 3, newTotalNormalSticker / 14));

    return this.validate(new Summary({
      freqCompletedPanCount: newTotalCompletedPanCount,
      totalMissionStickerCount: newTotalMissionSticker,
      totalNormalStickerCount: newTotalNormalSticker
    }));
  }

  withdraw(deductStickerToSummary: UpdateStickerProps): Summary {
    const newTotalMissionSticker = this.totalMissionStickerCount - deductStickerToSummary.missionStickerCount;
    const newTotalNormalSticker = this.totalNormalStickerCount - deductStickerToSummary.normalStickerCount;

    const newTotalCompletedPanCount = Math.floor(Math.min(newTotalMissionSticker / 3, newTotalNormalSticker / 14));

    return this.validate(new Summary({
      freqCompletedPanCount: newTotalCompletedPanCount,
      totalMissionStickerCount: newTotalMissionSticker,
      totalNormalStickerCount: newTotalNormalSticker
    }));
  }

  get freqCompletedPanCount(): number {
    return this.props.freqCompletedPanCount;
  }

  get totalNormalStickerCount(): number {
    return this.props.totalNormalStickerCount;
  }

  get totalMissionStickerCount(): number {
    return this.props.totalMissionStickerCount;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules
   */
  protected validate(summary: Summary): Summary {
    if (summary.freqCompletedPanCount < 0) {
      throw new ArgumentOutOfRangeException('완성판 개수는 0보다 크거나 같아야 합니다');
    }
    if (summary.totalNormalStickerCount < 0) {
      throw new ArgumentOutOfRangeException('일반 음료 스티커 개수는 0보다 크거나 같아야 합니다');
    }
    if (summary.totalMissionStickerCount < 0) {
      throw new ArgumentOutOfRangeException('미션 음료 스티커 개수는 0보다 크거나 같아야 합니다');
    }

    return summary;
  }
}
