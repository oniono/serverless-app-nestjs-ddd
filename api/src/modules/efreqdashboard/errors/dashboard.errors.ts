import { ExceptionBase } from '@src/libs/exceptions';

export class StickerNotEnoughBalanceError extends ExceptionBase {
  static readonly message: 'Sticker has not enough balance';

  public readonly code = 'STICKER.NOT_ENOUGH_BALANCE';

  constructor(metadata?: unknown) {
    super(StickerNotEnoughBalanceError.message, metadata);
  }
}
