import { CreateSticker } from '@src/interface-adapters/interfaces/sticker/create.sticker.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateStickerRequest implements CreateSticker {
  @ApiProperty({
    example: '1dd59902-5041-4e0a-992c-34a07fdebc09',
    description: '프리퀀시 대시보드 아이디',
  })
  @IsNotEmpty()
  readonly freqDashboardId: string;

  @ApiProperty({ 
    example: 'da19c551-296e-4780-a285-e8ba6b250fc2', 
    description: 'e프리퀀시 사용자 아이디' })
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ 
    example: 1, 
    description: '미션 음료 스티커 수' })
  @IsNumber()
  readonly missionStickerCount: number;

  @ApiProperty({ 
    example: 1, 
    description: '일반 음료 스티커 수' })
  @IsNumber()
  readonly normalStickerCount: number;
}

export class CreateStickerHttpRequest extends CreateStickerRequest
  implements CreateSticker {}

export class CreateStickerMessageRequest extends CreateStickerRequest
  implements CreateSticker {}
