import {ILoginEmail, ILoginResponse} from '@/core/models';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const sendWhatsappCode = async (
  phone: string,
): Promise<AxiosResponse<{goToVerify: boolean}>> => {
  try {
    const data = await api.post(ENDPOINTS.AUTH_SEND_WHATSAPP_CODE, {phone});

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const verifyWhatsapp = async (
  code: string,
  phone: string,
): Promise<AxiosResponse<ILoginResponse>> => {
  try {
    const data = await api.post(ENDPOINTS.AUTH_VERIFY_WHATSAPP_CODE, {
      code,
      phone,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const loginWithEmail = async (
  loginData: ILoginEmail,
): Promise<AxiosResponse<ILoginResponse>> => {
  try {
    const data = await api.post(ENDPOINTS.AUTH_LOGIN_EMAIL, loginData);

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {verifyWhatsapp, sendWhatsappCode, loginWithEmail};
