import {IAdress} from '../cep/cep.model';
import {ICreateUser, IUser} from '../user/user.model';

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
  _id: string;
  code: string;
  thumbs: string[];
  avatar: string;
  profileStatus: 'pre' | 'completed';
  approvedCustommers: any[];
  workers: any[];
  services: any[];
  createdAt: string;
  updatedAt: string;
}
