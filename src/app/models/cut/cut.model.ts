import {IBarber} from '../barber/barber.model';
import {IQueue} from '../queue/queue.model';
import {IBarberService} from '../service/service.model';
import {IGetTodayTickets} from '../ticket/ticket.model';

export type TCutSteps = 'select' | 'attendance';
export type TAttendanceType = 'queue' | 'schedule';

export interface ICutState {
  steps: TCutSteps;

  attendanceType?: TAttendanceType;
  selectedService?: IBarberService;
  selectedAdditionalServices?: IBarberService[];
  selectedBarber?: IBarber;
  scheduleConfig?: {
    date?: string;
    time?: string;
  };

  services?: IBarberService[];
  additionalServices?: IBarberService[];
  todayTickets?: IGetTodayTickets;
  customerIsOnQueue?: boolean;
  barberTodayQueue?: IQueue;

  showSelectedModal?: boolean;
}
