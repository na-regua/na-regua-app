import {IBarber} from '../barber/barber.model';
import {IQueue} from '../queue/queue.model';
import {IAppointment, IAvailableScheduleDate} from '../schedule/schedule.model';
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
  scheduleConfig?: IAppointment;

  services?: IBarberService[];
  additionalServices?: IBarberService[];
  availableSchedules?: IAvailableScheduleDate[];
  todayTickets?: IGetTodayTickets;
  customerIsOnQueue?: boolean;
  barberTodayQueue?: IQueue;

  showSelectedModal?: boolean;
}
