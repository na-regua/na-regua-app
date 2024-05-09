import {IFile} from '../file/file.model';
import {IBarberService} from '../service/service.model';
import {IUser} from '../user/user.model';

export type TNotifyTypes = 'error' | 'success' | 'default';

export interface INotify {
  id: string;
  message: string;
  type: TNotifyTypes;
  translate?: boolean;
}

export interface INotificationData {
  user?: IUser;
  service?: IBarberService;
  customer?: IUser;
  date?: string;
}
export interface INotification {
  _id: string;
  message: NotificationMessageType;
  to: IUser;
  read: boolean;
  data?: INotificationData;
  icon?: IFile;
  createdAt: string;
  updatedAt: string;
}

export interface IGetNotificationFilters {
  limit?: number;
  read?: boolean;
}

export type NotificationMessageType =
  | 'CUSTOMER_JOINED_QUEUE'
  | 'USER_ASK_TO_JOIN_QUEUE'
  | 'CUSTOMER_LEFT_QUEUE'
  | 'USER_ASK_TO_SCHEDULE'
  | 'USER_WILL_BE_LATE_TO_APPOINTMENT'
  | 'CUSTOMER_SCHEDULED_APPOINTMENT'
  | 'CUSTOMER_CANCELLED_APPOINTMENT'
  | 'USER_REJECTED_APPOINTMENT_RESCHEDULE'
  | 'GENERATED_STATEMENT'
  | 'OTHERS';

export const NOTIFICATION_TRANSLATION_KEYS: Record<
  NotificationMessageType,
  string
> = {
  CUSTOMER_JOINED_QUEUE: 'notifications.customerJoinedQueue',
  USER_ASK_TO_JOIN_QUEUE: 'notifications.userAskToJoinQueue',
  CUSTOMER_LEFT_QUEUE: 'notifications.customerLeftQueue',
  USER_ASK_TO_SCHEDULE: 'notifications.userAskToSchedule',
  USER_WILL_BE_LATE_TO_APPOINTMENT: 'notifications.userWillBeLateToAppointment',
  CUSTOMER_SCHEDULED_APPOINTMENT: 'notifications.customerScheduledAppointment',
  CUSTOMER_CANCELLED_APPOINTMENT: 'notifications.customerCancelledAppointment',
  USER_REJECTED_APPOINTMENT_RESCHEDULE:
    'notifications.userRejectedAppointmentReschedule',
  GENERATED_STATEMENT: 'notifications.generatedStatement',
  OTHERS: 'notifications.others',
};

export interface GetNotificationResponse {
  notifications: INotification[];
  total: number;
  hasUnread: boolean;
}
