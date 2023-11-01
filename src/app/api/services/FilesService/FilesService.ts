import api from '@/app/api/api';
import {IFile} from '@/app/models';
import {AxiosResponse} from 'axios';
import {default as ENDPOINTS} from '../../endpoints';
import {assetToBuffer, queryBuilder} from '@/utils';
import {Asset} from 'react-native-image-picker';

const getBarberFiles = async (
  barberId: string,
): Promise<AxiosResponse<{thumbs: IFile[]; avatar: IFile}>> => {
  try {
    const url = queryBuilder(ENDPOINTS.FILES_BARBER, {barberId});

    const data = await api.get(url);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateBarberAvatarFile = async (
  avatarId: string,
  file: Asset,
): Promise<AxiosResponse<IFile>> => {
  try {
    const url = queryBuilder(
      ENDPOINTS.FILES_UPDATE_BARBER_AVATAR,
      {},
      avatarId,
    );

    const formData = new FormData();

    const fileBuffer = assetToBuffer([file])[0];

    formData.append('file', fileBuffer);

    const data = await api.put(url, formData, {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default {
  getBarberFiles,
  updateBarberAvatarFile,
};
