import {IBuffer, IGetWorkerParams, IWorker} from '@/app/models';
import {IWorkerForm} from '@/components/molecules';
import {queryBuilder} from '@/utils/queryBuilder';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const getWorkers = async (
  params: IGetWorkerParams,
): Promise<AxiosResponse<IWorker[]>> => {
  try {
    const url = queryBuilder(ENDPOINTS.WORKERS_LIST, params);

    const data = await api.get(url, {withCredentials: true});

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const createWorker = async (
  params: IWorkerForm,
  avatar: IBuffer,
): Promise<AxiosResponse<null>> => {
  try {
    const formData = new FormData();

    for (const key in params) {
      formData.append(key, params[key as keyof IWorkerForm]);
    }

    formData.append('file', avatar);

    const data = await api.post(ENDPOINTS.WORKERS_CREATE, formData, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const updateWorker = async (
  workerId: string,
  params?: Partial<IWorkerForm>,
  avatar?: IBuffer,
): Promise<AxiosResponse<null>> => {
  try {
    const formData = new FormData();

    if (params) {
      for (const key in params) {
        formData.append(key, params[key as keyof IWorkerForm]);
      }
    }

    if (avatar) {
      formData.append('file', avatar);
    }

    const url = queryBuilder(ENDPOINTS.WORKERS_UPDATE, {}, workerId);

    const data = await api.put(url, formData, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const deleteWorker = async (workerId: string): Promise<AxiosResponse<null>> => {
  try {
    const url = queryBuilder(ENDPOINTS.WORKERS_DELETE, {}, workerId);

    const data = await api.delete(url, {withCredentials: true});

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {
  getWorkers,
  createWorker,
  updateWorker,
  deleteWorker,
};
