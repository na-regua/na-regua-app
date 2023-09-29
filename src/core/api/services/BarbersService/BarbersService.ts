import api, {errToAxiosError} from '@/core/api/api';
import endpoints from '../../endpoints';
import {IBarber, ICreateBarber} from '@/core/models';
import {AxiosResponse} from 'axios';

const getBarbers = async (): Promise<AxiosResponse> => {
  try {
    const data = await api.get(endpoints.getBarbers);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const preSignInBarber = async (
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
    const data = await api.post(endpoints.barbersPreSignIn, formData);

    return data;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
};

export default {getBarbers, preSignInBarber};
