import {IBarber} from '../barber/barber.model';
import {ITicket} from '../ticket/ticket.model';
import {IWorker} from '../worker/worker.model';

export interface IQueue {
  _id: string;
  workers: IWorker[];
  status: 'on' | 'off' | 'paused';
  barber: IBarber;
  serveds: ITicket[];
  misseds: ITicket[];
  tickets: ITicket[];
  createdAt: string;
  updatedAt: string;
}

export type TOnQueueViewModes = 'fs' | 'fs-out';

export const ON_QUEUE_VIEW_MODE_KEY = 'onQueueViewMode';
