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
  profile_status: 'pre' | 'completed';
  createdAt: string;
  updatedAt: string;
  config: IBarberServiceConfig;
  customers: IUser[];
  rating?: number;
  open: boolean;
}

export interface IBarberServiceConfig {
  work_days: string[];
  work_time: TWorkTime;
  open_barber_auto: boolean;
  open_queue_auto: boolean;
  schedule_limit_days: number;
  schedules_by_day: number;
  schedule_times: string[];
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
  access_token: string;
}

export interface IBarberServiceGeneralConfig {
  workdays: string[];
  schedule_limit_days: number;
  open_barber_auto: boolean;
  open_queue_auto: boolean;
}

export interface IBarberServiceDaysConfig {
  work_time: TWorkTime;
  schedules_by_day: number;
  schedule_times: string[];
}
