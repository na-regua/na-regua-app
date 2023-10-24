import {IBarberService, IGetBarberServicesParams} from '@/app/models';
import {IBarberServiceForm} from '@/components/molecules';
import {queryBuilder} from '@/utils';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const getServices = async (
  params: IGetBarberServicesParams,
): Promise<AxiosResponse<IBarberService[]>> => {
  try {
    const url = queryBuilder(ENDPOINTS.SERVICES_LIST, params);

    const data = await api.get(url, {withCredentials: true});

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const createService = async (
  service: IBarberServiceForm,
): Promise<AxiosResponse<IBarberService>> => {
  try {
    const data = await api.post(ENDPOINTS.SERVICES_CREATE, service, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const updateService = async (
  serviceID: string,
  service: Partial<IBarberServiceForm>,
): Promise<AxiosResponse<null>> => {
  try {
    const url = queryBuilder(ENDPOINTS.SERVICES_UPDATE, {}, serviceID);
    const data = await api.put(url, service, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const deleteService = async (
  serviceID: string,
): Promise<AxiosResponse<null>> => {
  try {
    const url = queryBuilder(ENDPOINTS.SERVICES_DELETE, {}, serviceID);
    const data = await api.delete(url, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {createService, deleteService, getServices, updateService};
