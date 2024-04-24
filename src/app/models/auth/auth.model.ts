import {IBarber} from '../barber/barber.model';
import {IUser} from '../user/user.model';

export interface ILoginEmail {
  email: string;
  password: string;
}

export interface ILoginPhone {
  phone: string;
}

export interface IVerifyCode {
  phone: string;
  code: string;
}

export interface ILoginResponse {
  accessToken: string;
  barber: IBarber;
  user: IUser;
}

export interface IGetUserResponse {
  user: IUser;
  barber?: IBarber;
}
