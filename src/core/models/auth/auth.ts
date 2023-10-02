import {IBarber} from '../barber/barber';
import {IUser} from '../user/user';

export interface ILoginEmail {
  email: string;
  password: string;
}

export interface ILoginWhatsapp {
  phone: string;
}

export interface IVerifyWhatsappCode {
  phone: string;
  code: string;
}

export interface ILoginResponse {
  barber?: IBarber;
  user: IUser;
  accessToken: string;
}
