import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base';

export class CreateUserCommand extends Command {
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.city = props.city;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }

  readonly email: string;

  readonly city: string;

  readonly postalCode: string;

  readonly street: string;
}
