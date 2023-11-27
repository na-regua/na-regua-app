import {IAdress} from '../cep/cep.model';
import {IFile} from '../file/file.model';
import {ICreateUser} from '../user/user.model';

export interface IBuffer {
  name: string;
  type: string;
  uri: string;
}

export interface ICreateBarber extends IAdress, ICreateUser {
  files: IBuffer[];
}

export interface IBarber extends IAdress, IBarberServiceConfig {
  _id: string;
  name: string;
  phone: string;
  email: string;
  phoneConfirmed: boolean;
  code: string;
  thumbs: IFile[];
  avatar: IFile;
  profileStatus: 'pre' | 'completed';
  approvedCustommers: any[];
  workers: any[];
  services: any[];
  createdAt: string;
  updatedAt: string;
}

export interface IBarberServiceConfig {
  workDays: string[];
  businessDaysConfig: IBarberServiceDayConfig;
  holidaysConfig: IBarberServiceDayConfig;
  scheduleLimitDays: number;
}

export interface IBarberServiceDayConfig {
  workTime: TWorkTime;
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
