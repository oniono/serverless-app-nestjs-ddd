import { Logger, Provider } from '@nestjs/common';

/* Constructing custom providers
 */
export const createStickerCliLoggerSymbol = Symbol('createStickerCliLoggerSymbol');

export const createStickerCliLoggerProvider: Provider = {
  provide: createStickerCliLoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('create-user-cli');
  },
};
