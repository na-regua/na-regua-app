import api, {errToAxiosError} from '@/app/api/api';
import {
  IBarber,
  IBarberUpdate,
  ICreateBarber,
  SignUpResponse,
} from '@/app/models';
import {AxiosResponse} from 'axios';
import {default as ENDPOINTS} from '../../endpoints';
import {queryBuilder} from '@/utils';

const getBarbers = async (
  search?: string,
): Promise<AxiosResponse<IBarber[]>> => {
  try {
    const url = queryBuilder(ENDPOINTS.BARBERS_LIST, {search});

    const data = await api.get(url);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const update = async (params: IBarberUpdate): Promise<AxiosResponse<null>> => {
  try {
    let payload = {
      ...params.profileData,
      config: params.servicesConfig,
    };

    const data = await api.put(ENDPOINTS.BARBERS_UPDATE, payload, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const signUpBarber = async (
  barber: ICreateBarber,
): Promise<AxiosResponse<SignUpResponse>> => {
  const formData = new FormData();

  for (const key in barber) {
    if (key !== 'files' && key !== 'address') {
      formData.append(key, barber[key as keyof ICreateBarber]);
    }

    if (key === 'address') {
      formData.append(key, JSON.stringify(barber.address));
    }

    if (key === 'files') {
      barber.files.forEach((file: any) => {
        formData.append('files', file);
      });
    }
  }

  try {
    const data = await api.post(ENDPOINTS.BARBERS_SIGN_UP, formData);

    return data;
  } catch (err) {
    throw errToAxiosError(err);
  }
};

const completeProfile = async (): Promise<AxiosResponse<IBarber>> => {
  try {
    const data = await api.post(
      ENDPOINTS.BARBERS_COMPLETE_PROFILE,
      {},
      {withCredentials: true},
    );

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const setOpen = async (open: boolean): Promise<AxiosResponse<null>> => {
  try {
    const response = await api.put(
      ENDPOINTS.BARBERS_OPEN,
      {open},
      {withCredentials: true},
    );

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {
  completeProfile,
  getBarbers,
  signUpBarber,
  update,
  setOpen,
};
