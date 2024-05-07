import {GetNotificationResponse, IGetNotificationFilters} from '@/app/models';
import {mapPathVariables, queryBuilder} from '@/utils';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const getNotifications = async (
  filters: IGetNotificationFilters,
): Promise<AxiosResponse<GetNotificationResponse>> => {
  try {
    const url = queryBuilder(ENDPOINTS.NOTIFICATION_LIST_BY_USER, filters);

    console.log(url);

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

export default {getNotifications, markAsReadById, markAllAsRead};
