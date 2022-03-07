import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Result } from '@src/libs/ddd/domain/utils/result.util';
import { InvalidBarcodeError } from '../../errors/barcode.errors';

export interface CreateBarcodeProps {
  userId: UUID;
}

export interface BarcodeProps extends CreateBarcodeProps {
  freqBarcodeNo: string;
}

export class BarcodeEntity extends AggregateRoot<BarcodeProps> {
  protected readonly _id: UUID;

  static create(create: CreateBarcodeProps): BarcodeEntity {
    const id = UUID.generate();
    const props: BarcodeProps = { ...create, freqBarcodeNo: UUID.generate().unpack() };
    const freqBarcodeNo = new BarcodeEntity({ id, props });

    return freqBarcodeNo;
  }

  /**
   * Protects barcode invariant.
   * This method is executed by a repository
   * before saving entity in a database.
   */
  public validate(): void {
    // Check Digit Calcuation Logic
    const validBarcode = true;

    if (!validBarcode) {
      throw new ArgumentOutOfRangeException(
        'Barcode has to be valid digit',
      );
    }
  }
}
