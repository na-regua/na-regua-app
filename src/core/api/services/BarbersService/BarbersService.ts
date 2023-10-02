import api, {errToAxiosError} from '@/core/api/api';
import {IBarber, ICreateBarber} from '@/core/models';
import {AxiosResponse} from 'axios';
import {default as ENDPOINTS} from '../../endpoints';

const getBarbers = async (): Promise<AxiosResponse> => {
  try {
    const data = await api.get(ENDPOINTS.BARBERS_LIST);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const signUpBarber = async (
  barber: ICreateBarber,
): Promise<AxiosResponse<IBarber>> => {
  const formData = new FormData();

  for (const key in barber) {
    if (key === 'files') {
      barber[key].forEach((file: any) => {
        formData.append('files', file);
      });
    } else if (key === 'user') {
      formData.append('user', JSON.stringify(barber[key]));
    } else {
      formData.append(key, barber[key as keyof ICreateBarber]);
    }
  }

  try {
    const data = await api.post(ENDPOINTS.BARBERS_SIGN_UP, formData);

    return data;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
};

export default {getBarbers, signUpBarber};
