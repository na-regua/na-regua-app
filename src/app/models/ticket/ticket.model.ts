import {IQueue} from '../queue/queue.model';
import {IBarberService} from '../service/service.model';
import {IUser} from '../user/user.model';
import {IWorker} from '../worker/worker.model';

export interface ITicket {
  _id: string;
  customer: IUser;
  service?: IBarberService;
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
}

export interface IScheduleTicket {
  date: string;
  time: string;
}

export interface IQueueTicket {
  position: number;
  queueDTO: IQueue;
}
