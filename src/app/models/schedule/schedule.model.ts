import {DateType} from 'react-native-ui-datepicker';

export const getDayToWorkDays: Record<number, string> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

export interface IAvailableScheduleDate {
  date: Date;
  schedules: string[];
}

export interface IAppointment {
  date: Date | DateType | string;
  time: string;
}

export interface IGetAvailableSchedulesParams {
  barberId: string;
  from?: Date | string;
  to?: Date | string;
}

export interface ICreateSchedulePayload {
  barberId: string;
  serviceId: string;
  date: Date | string | DateType;
  time: string;
}
