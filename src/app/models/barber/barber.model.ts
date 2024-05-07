import {IAdress} from '../cep/cep.model';
import {IFile} from '../file/file.model';
import {ICreateUser, IUpdateUser, IUser} from '../user/user.model';

export interface IBuffer {
  name: string;
  type: string;
  uri: string;
}

export interface ICreateBarber extends ICreateUser {
  files: IBuffer[];
  address: IAdress;
}

export interface IBarber extends IBarberServiceConfig {
  _id: string;
  name: string;
  phone: number;
  email: string;
  address: IAdress;
  verified: boolean;
  code: string;
  thumbs: IFile[];
  avatar: IFile;
  status: 'active' | 'inactive';
  profileStatus: 'pre' | 'completed';
  createdAt: string;
  updatedAt: string;
  config: IBarberServiceConfig;
}

export interface IBarberServiceConfig {
  workDays: string[];
  workTime: TWorkTime;
  openBarberAuto: boolean;
  openQueueAuto: boolean;
  scheduleLimitDays: number;
  schedulesByDay: number;
  schedules: IBarberCreateSchedule[];
}

export interface IBarberCreateSchedule {
  time: string;
  recommended?: boolean;
  active?: boolean;
}

export type TWorkTime = {
  start: string;
  end: string;
};

export interface IEditBarberProfileForm {
  name: string;
  address: string;
}

export interface IBarberUpdate {
  profileData?: IUpdateUser;
  addressData?: Partial<IAdress>;
  servicesConfig?: Partial<IBarberServiceConfig>;
}

export interface SignUpResponse {
  barber: IBarber;
  user: IUser;
  accessToken: string;
}
