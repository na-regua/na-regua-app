import {IBarber} from '../barber/barber.model';
import {IFile} from '../file/file.model';

export type TUserRoles = 'admin' | 'worker' | 'customer';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  role: TUserRoles;
  avatar: IFile;
  phoneConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  favorites?: string[] | IBarber[];
}

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ICreateCustomerUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUpdateUser extends Partial<Omit<ICreateUser, 'password'>> {}
