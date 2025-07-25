import {
  IAvailableScheduleDate,
  ICreateSchedulePayload,
  IGetAvailableSchedulesParams,
  ITicket,
  PaginatedResponse,
} from '@/app/models';
import {queryBuilder} from '@/utils';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

async function getAvailableSchedules(
  filters: IGetAvailableSchedulesParams,
): Promise<AxiosResponse<IAvailableScheduleDate[]>> {
  try {
    const url = queryBuilder(ENDPOINTS.SCHEDULES_LIST_AVAILABLE, filters);

    const response = await api.get(url, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
}

async function createSchedule(
  payload: ICreateSchedulePayload,
): Promise<AxiosResponse> {
  try {
    const response = await api.post(ENDPOINTS.SCHEDULES_CREATE, payload, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
}

async function getUserSchedules(
  payload?: any,
): Promise<AxiosResponse<PaginatedResponse<ITicket>>> {
  try {
    const url = queryBuilder(ENDPOINTS.SCHEDULES_BY_USER, payload);

    const response = await api.get(url, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
}

export default {
  getAvailableSchedules,
  createSchedule,
  getUserSchedules,
};
