import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { BarcodeEntity, BarcodeProps } from '../../domain/entities/barcode.entity';

export type BarcodeRepositoryPort = RepositoryPort<BarcodeEntity, BarcodeProps>;
