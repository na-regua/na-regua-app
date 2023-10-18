export type TUserRoles = 'admin' | 'barber' | 'customer';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TUserRoles;
  avatar: string;
  phoneConfirmed: boolean;
}

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
