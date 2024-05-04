import {IGetNotificationFilters} from '@/app/models';
import {queryBuilder} from '@/utils';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const getNotifications = async (filters: IGetNotificationFilters) => {
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

export default {getNotifications};
