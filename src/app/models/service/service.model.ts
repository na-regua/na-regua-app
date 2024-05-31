export type IBarberServiceIcon = 'navalha' | 'maquina' | 'pente';

export interface IBarberService {
  _id: string;
  name: string;
  price: number;
  duration_in_minutes: number;
  icon: IBarberServiceIcon;
  barberId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetBarberServicesParams {
  barberId?: string;
  additional?: boolean;
  all?: boolean;
}

export interface IBarberServiceForm {
  name: string;
  duration_in_minutes: string;
  price: string;
  icon: IBarberServiceIcon;
}
