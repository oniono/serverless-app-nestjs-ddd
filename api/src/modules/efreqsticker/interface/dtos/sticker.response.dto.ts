import { StickerEntity } from '@src/modules/efreqsticker/domain/entities/sticker.entity';
import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { Sticker } from '@src/interface-adapters/interfaces/sticker/sticker.interface';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object';

export class StickerResponse extends ResponseBase implements Sticker {
  constructor(sticker: StickerEntity) {
    super(sticker);
    /* Whitelisting returned data to avoid leaks.
       If a new property is added, like password or a
       credit card number, it won't be returned
       unless you specifically allow this.
       (avoid blacklisting, which will return everything
        but blacklisted items, which can lead to a data leak).
    */
    const props = sticker.getPropsCopy();
    this.freqDashboardId = props.freqDashboardId;
    this.missionStickerCount = props.missionStickerCount;
    this.normalStickerCount = props.normalStickerCount;
  }

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "Sticker's email address",
  })
  freqDashboardId: string;

  @ApiProperty({
    example: '1',
    description: "미션 음료 스티커 개수",
  })
  missionStickerCount: number;

  @ApiProperty({
    example: '1',
    description: '일반 음료 스티커 개수',
  })
  normalStickerCount: number;
}

export class StickerHttpResponse extends StickerResponse implements Sticker {}
