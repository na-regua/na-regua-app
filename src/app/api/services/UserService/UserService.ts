import {IBarber, ICreateCustomerUser, IUpdateUser, IUser} from '@/app/models';
import {
  assetToBuffer,
  mapPathVariables,
  numberMask,
  queryBuilder,
} from '@/utils';
import {Asset} from 'react-native-image-picker';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';
import {AxiosResponse} from 'axios';

const updateUser = async (userData: IUpdateUser, id: string) => {
  try {
    const url = queryBuilder(ENDPOINTS.USERS_UPDATE, {}, id);
    const response = await api.put(url, userData, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const createCustomerUser = async (
  userData: ICreateCustomerUser,
  avatar: Asset,
): Promise<AxiosResponse<IUser>> => {
  try {
    if (userData.phone) {
      userData.phone = numberMask(userData.phone);
    }

    const formData = new FormData();

    if (avatar) {
      formData.append('file', assetToBuffer([avatar])[0]);
    }

    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('role', 'customer');

    const response = await api.post(ENDPOINTS.USERS_CREATE, formData);

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const favoriteBarber = async (barberId: string) => {
  try {
    const url = mapPathVariables(ENDPOINTS.USERS_FAVORITE_BARBER, {barberId});
    const response = await api.put(url, {}, {withCredentials: true});

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const getFavoriteBarbers = async (): Promise<AxiosResponse<IBarber[]>> => {
  try {
    const response = await api.get(ENDPOINTS.USERS_LIST_FAVORITES, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {
  updateUser,
  createCustomerUser,
  favoriteBarber,
  getFavoriteBarbers,
};
