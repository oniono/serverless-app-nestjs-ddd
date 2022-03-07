import { CreateUser } from '@src/interface-adapters/interfaces/user/create.user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequest implements CreateUser {
  @ApiProperty({
    example: 'john@sp.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Seoul', description: 'City of residence' })
  @MaxLength(50)
  @MinLength(4)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly city: string;

  @ApiProperty({ example: '28566', description: 'Postal code' })
  @MaxLength(10)
  @MinLength(4)
  @IsAlphanumeric()
  readonly postalCode: string;

  @ApiProperty({ example: 'Gangnamdaero', description: 'Street' })
  @MaxLength(50)
  @MinLength(5)
  @Matches(/^[a-zA-Z ]*$/)
  readonly street: string;
}

export class CreateUserHttpRequest extends CreateUserRequest
  implements CreateUser {}

export class CreateUserMessageRequest extends CreateUserRequest
  implements CreateUser {}
