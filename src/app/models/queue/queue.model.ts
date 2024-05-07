import {IBarber} from '../barber/barber.model';
import {ITicket} from '../ticket/ticket.model';
import {IWorker} from '../worker/worker.model';

export type TQueueStatus = 'on' | 'off' | 'paused';

export interface IQueue {
  _id: string;
  workers: IWorker[];
  status: TQueueStatus;
  barber: IBarber;
  serveds: ITicket[];
  misseds: ITicket[];
  tickets: ITicket[];
  createdAt: string;
  updatedAt: string;
}

export type TOnQueueViewModes = 'fs' | 'fs-out';

export const ON_QUEUE_VIEW_MODE_KEY = 'onQueueViewMode';
