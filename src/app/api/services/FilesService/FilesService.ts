import api, {errToAxiosError} from '@/app/api/api';
import {IFile} from '@/app/models';
import {assetToBuffer, mapPathVariables, queryBuilder} from '@/utils';
import {AxiosResponse} from 'axios';
import {Asset} from 'react-native-image-picker';
import {default as ENDPOINTS} from '../../endpoints';

const getBarberFiles = async (
  barberId: string,
): Promise<AxiosResponse<{thumbs: IFile[]; avatar: IFile}>> => {
  try {
    const url = queryBuilder(ENDPOINTS.FILES_BARBER, {barberId});

    const data = await api.get(url);

    return data;
  } catch (error: any) {
    throw errToAxiosError(error);
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
    throw errToAxiosError(error);
  }
};

const updateBarberThumbFile = async (
  thumbId: string,
  file: Asset,
): Promise<AxiosResponse<null>> => {
  try {
    const formData = new FormData();

    const fileBuffer = assetToBuffer([file])[0];

    formData.append('file', fileBuffer);

    const url = mapPathVariables(ENDPOINTS.FILES_UPDATE_BARBER_THUMBS, {
      thumbId,
    });

    const res = await api.put(url, formData, {
      withCredentials: true,
    });

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

const uploadBarberThumbs = async (
  files: Asset[],
): Promise<AxiosResponse<null>> => {
  try {
    const url = ENDPOINTS.FILES_UPLOAD_BARBER_THUMBS;

    const formData = new FormData();

    files.forEach(file => {
      const fileBuffer = assetToBuffer([file])[0];

      formData.append('files', fileBuffer);
    });

    const res = await api.post(url, formData, {
      withCredentials: true,
    });

    return res;
  } catch (error: any) {
    throw errToAxiosError(error);
  }
};

const deleteBarberThumb = async (
  thumbId: string,
): Promise<AxiosResponse<null>> => {
  try {
    const url = mapPathVariables(ENDPOINTS.FILES_DELETE_BARBER_THUMBS, {
      thumbId,
    });

    const res = await api.delete(url, {withCredentials: true});

    return res;
  } catch (error: any) {
    throw errToAxiosError(error);
  }
};

export default {
  getBarberFiles,
  updateBarberAvatarFile,
  updateBarberThumbFile,
  uploadBarberThumbs,
  deleteBarberThumb,
};
