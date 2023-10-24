import {IUser} from '../user/user.model';

export interface IWorker {
  user: IUser;
  barber: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetWorkerParams {
  barberId: string;
}
