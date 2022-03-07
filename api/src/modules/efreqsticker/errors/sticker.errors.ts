import { ExceptionBase } from '@src/libs/exceptions';

export class StickerAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Sticker already exists';

  public readonly code = 'USER.ALREADY_EXISTS';

  constructor(metadata?: unknown) {
    super(StickerAlreadyExistsError.message, metadata);
  }
}
