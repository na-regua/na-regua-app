export type TNotifyTypes = 'error' | 'success' | 'default';

export interface INotify {
  id: string;
  message: string;
  type: TNotifyTypes;
}
