import {
  GetNotificationResponse,
  IGetNotificationFilters,
  IPushNotification,
} from '@/app/models';
import {mapPathVariables, queryBuilder} from '@/utils';
import {AxiosResponse} from 'axios';
import {Platform} from 'react-native';
import PushNotification, {
  PushNotificationObject,
} from 'react-native-push-notification';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';
import {androidChannelId} from '../../../../App';

const getNotifications = async (
  filters: IGetNotificationFilters,
): Promise<AxiosResponse<GetNotificationResponse>> => {
  try {
    const url = queryBuilder(ENDPOINTS.NOTIFICATION_LIST_BY_USER, filters);

    const response = await api.get(url, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const markAsReadById = async (notificationId: string): Promise<void> => {
  try {
    const url = mapPathVariables(ENDPOINTS.NOTIFICATION_MARK_AS_VIEWED, {
      notificationId,
    });

    return await api.put(url, null, {
      withCredentials: true,
    });
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const markAllAsRead = async (): Promise<void> => {
  try {
    return await api.put(ENDPOINTS.NOTIFICATION_MARK_ALL_AS_VIEWED, null, {
      withCredentials: true,
    });
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const pushNotification = (
  push: IPushNotification,
  options?: PushNotificationObject,
) => {
  if (Platform.OS === 'ios') {
    PushNotification.localNotification({
      ...options,
      message: push.message,
    });
  }

  if (Platform.OS === 'android') {
    PushNotification.localNotification({
      ...options,
      message: push.message,
      channelId: androidChannelId,
    });
  }
};

export default {
  getNotifications,
  markAsReadById,
  markAllAsRead,
  pushNotification,
};
