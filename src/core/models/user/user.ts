export type TUserRoles = 'admin' | 'barber' | 'customer';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TUserRoles;
}

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
