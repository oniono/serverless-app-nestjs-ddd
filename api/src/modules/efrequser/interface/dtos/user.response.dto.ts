import { UserEntity } from '@src/modules/efrequser/domain/entities/user.entity';
import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { User } from '@src/interface-adapters/interfaces/user/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse extends ResponseBase implements User {
  constructor(user: UserEntity) {
    super(user);
    /* Whitelisting returned data to avoid leaks.
       If a new property is added, like password or a
       credit card number, it won't be returned
       unless you specifically allow this.
       (avoid blacklisting, which will return everything
        but blacklisted items, which can lead to a data leak).
    */
    const props = user.getPropsCopy();
    this.email = props.email.value;
    this.city = props.address.city;
    this.postalCode = props.address.postalCode;
    this.street = props.address.street;
  }

  @ApiProperty({
    example: 'coffee@sp.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'Seoul',
    description: "User's city of residence",
  })
  city: string;

  @ApiProperty({
    example: '123456',
    description: 'Postal code',
  })
  postalCode: string;

  @ApiProperty({
    example: 'Teheran-ro',
    description: 'Street where the user is registered',
  })
  street: string;
}

export class UserHttpResponse extends UserResponse implements User {}
