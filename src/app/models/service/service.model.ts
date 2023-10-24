export type IBarberServiceIcon = 'navalha' | 'maquina' | 'pente';

export interface IBarberService {
  _id: string;
  name: string;
  price: number;
  durationInMinutes: number;
  icon: IBarberServiceIcon;
  barberId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetBarberServicesParams {
  barberId?: string;
}
