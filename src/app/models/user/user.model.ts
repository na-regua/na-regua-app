export type TUserRoles = 'admin' | 'worker' | 'custommer';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TUserRoles;
  avatar: string;
  phoneConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
