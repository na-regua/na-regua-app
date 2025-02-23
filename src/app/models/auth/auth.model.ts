import {IBarber} from '../barber/barber.model';
import {IUser} from '../user/user.model';

export interface ILoginEmail {
  email: string;
  password: string;
}

export interface ILoginPhone {
  phone: string;
}

export interface ILoginEmailCode {
  email: string;
}

export interface IVerifyCode {
  phone: string;
  code: string;
}

export interface IVerifyEmailCode {
  email: string;
  code: string;
}

export interface ILoginResponse {
  access_token: string;
  barber: IBarber;
  user: IUser;
}

export interface IGetUserResponse {
  user: IUser;
  barber?: IBarber;
}

export interface ICustomerSignUp {
  name: string;
  phone: string;
}
