import {IAdress} from '../cep/cep';
import {ICreateUser, IUser} from '../user/user';

export interface IBuffer {
  name: string;
  type: string;
  uri: string;
}

export interface ICreateBarber extends IAdress {
  user: ICreateUser;
  files: IBuffer[];
}

export interface IBarber extends IAdress {
  user: IUser;
  code: string;
  thumbs: string[];
  avatar: string;
  profileStatus: 'pre' | 'completed';
  approvedCustommers: any[];
  workers: any[];
  services: any[];
}
