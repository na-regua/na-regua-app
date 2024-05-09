import {IQueue} from '@/app/models';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const getTodayQueue = async (): Promise<AxiosResponse<{queue: IQueue}>> => {
  try {
    const res = await api.get(ENDPOINTS.QUEUE_GET_TODAY, {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const startQueue = async (): Promise<AxiosResponse<{queue: IQueue}>> => {
  try {
    const res = await api.post(
      ENDPOINTS.QUEUE_CREATE,
      {},
      {withCredentials: true},
    );

    return res;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {getTodayQueue, startQueue};
