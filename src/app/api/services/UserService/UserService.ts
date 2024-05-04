import {IUpdateUser} from '@/app/models';
import {queryBuilder} from '@/utils';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

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

export default {updateUser};
