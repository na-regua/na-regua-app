import {ICreateCustomerUser, IUpdateUser, IUser} from '@/app/models';
import {assetToBuffer, numberMask, queryBuilder} from '@/utils';
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

export default {updateUser, createCustomerUser};
