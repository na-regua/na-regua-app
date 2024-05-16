import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';
import {IGetTodayTickets} from '@/app/models';

const getToday = async (): Promise<AxiosResponse<IGetTodayTickets>> => {
  try {
    const res = await api.get(ENDPOINTS.TICKETS_BY_USER_TODAY, {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    throw errToAxiosError(error);
  }
};
export default {getToday};
