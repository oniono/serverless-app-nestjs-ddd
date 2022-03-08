export enum UserRoles {
  admin = 'admin',
  operator = 'operator',
  user = 'user',
}

export interface UpdateUserAddressProps {
  city?: string;
  postalCode?: string;
  street?: string;
}
