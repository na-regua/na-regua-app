import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';
import {IGetTodayTickets, ITicketRate} from '@/app/models';
import {mapPathVariables} from '@/utils';

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

const rateById = async (
  ticketId: string,
  rate: ITicketRate,
  on_queue: boolean = false,
): Promise<AxiosResponse<null>> => {
  try {
    const url = mapPathVariables(ENDPOINTS.TICKETS_RATE, {ticketId});

    const response = await api.put(
      url,
      {...rate, on_queue},
      {withCredentials: true},
    );

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {getToday, rateById};
