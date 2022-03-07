import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { StickerEntity, StickerProps } from '../../domain/entities/sticker.entity';

export type StickerRepositoryPort = RepositoryPort<StickerEntity, StickerProps>;