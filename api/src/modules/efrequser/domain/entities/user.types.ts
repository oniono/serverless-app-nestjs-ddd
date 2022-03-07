export enum UserRoles {
  admin = 'admin',
  moderator = 'moderator',
  guest = 'guest',
}

export interface UpdateUserAddressProps {
  city?: string;
  postalCode?: string;
  street?: string;
}
