import {
  IGetTicketsHistory,
  IGetTodayTickets,
  ITicket,
  ITicketRate,
  PaginatedFilter,
} from '@/app/models';
import {mapPathVariables, queryBuilder} from '@/utils';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

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
): Promise<AxiosResponse<{ticket: ITicket}>> => {
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

const getHistory = async (
  filters?: PaginatedFilter,
): Promise<AxiosResponse<IGetTicketsHistory>> => {
  try {
    const url = queryBuilder(ENDPOINTS.TICKETS_HISTORY, {...filters});

    const response = await api.get(url, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {getToday, rateById, getHistory};
