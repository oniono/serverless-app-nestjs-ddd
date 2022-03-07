import { ExceptionBase } from '@src/libs/exceptions';

export class InvalidBarcodeError extends ExceptionBase {
  static readonly message: 'Barcode is invalid';

  public readonly code = 'BARCODE.NOT_VALID';

  constructor(metadata?: unknown) {
    super(InvalidBarcodeError.message, metadata);
  }
}
