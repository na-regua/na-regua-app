import {IBarber} from '../barber/barber.model';
import {IBarberService} from '../service/service.model';

export type TCutSteps = 'select' | 'attendance';
export type TAttendanceType = 'queue' | 'schedule';

export interface ICutState {
  steps: TCutSteps;
  attendanceType?: TAttendanceType;
  selectedService?: IBarberService;
  selectedBarber?: IBarber;
  scheduleConfig?: {
    date?: string;
    time?: string;
  };
  services?: IBarberService[];
}
