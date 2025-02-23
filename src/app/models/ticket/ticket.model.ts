import {IBarber} from '../barber/barber.model';
import {PaginatedFilter} from '../generic';
import {IQueue} from '../queue/queue.model';
import {IBarberService} from '../service/service.model';
import {IUser} from '../user/user.model';
import {IWorker} from '../worker/worker.model';

export interface ITicket {
  _id: string;
  barber: IBarber;
  customer: IUser;
  service: IBarberService;
  additional_services?: IBarberService[];
  status: 'pending' | 'queue' | 'scheduled' | 'missed' | 'served';
  type: 'queue' | 'schedule';
  queue?: IQueueTicket;
  schedule?: IScheduleTicket;
  billed: boolean;
  approved: boolean;
  servedBy?: IWorker;

  servedAt?: string;
  missedAt?: string;
  createdAt: string;
  updatedAt: string;

  rate?: ITicketRate;
}

export interface ITicketRate {
  rating: number;
  comment?: string;
}

export interface IScheduleTicket {
  date: string;
  time: string;
}

export interface IQueueTicket {
  position: number;
  queue_dto: IQueue;
}

export interface ITicketViewState {
  ticket: ITicket | null;
  loading: boolean;
  queue: IQueue | null;
}

export interface OnTicketGeneralProps {
  ticket: ITicket;
  hasAdditionalServices?: boolean;

  cleanSocketEvents?: () => void;
}

export interface IGetTodayTickets {
  queue: ITicket;
  schedules: ITicket[];
}

export interface IGetTicketsHistory {
  tickets: ITicket[];
  total: number;
  limit: number;
  offset: number;
  next: boolean;
}

export interface ITicketHistoryState {
  tickets: ITicket[];
  loading?: boolean;
  refreshing?: boolean;
  filters: PaginatedFilter;
}
