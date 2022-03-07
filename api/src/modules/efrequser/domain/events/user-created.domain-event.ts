import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events';

// DomainEvent is a plain object with properties
export class UserCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
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
