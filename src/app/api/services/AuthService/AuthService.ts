import {IGetUserResponse, ILoginEmail, ILoginResponse} from '@/app/models';
import {AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import ENDPOINTS from '../../endpoints';

const sendOTPCode = async (
  phone: string,
): Promise<AxiosResponse<{goToVerify: boolean}>> => {
  try {
    const unmaskedPhone = phone.replace(/\D/g, '');

    const data = await api.post(ENDPOINTS.AUTH_SEND_CODE, {
      phone: unmaskedPhone,
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

const verifyOTPCode = async (
  code: string,
  phone: string,
): Promise<AxiosResponse<ILoginResponse>> => {
  try {
    const unmaskedPhone = phone.replace(/\D/g, '');

    const data = await api.post(ENDPOINTS.AUTH_VERIFY_CODE, {
      code,
      phone: unmaskedPhone,
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

const getCurrentUser = async (
  token: string,
): Promise<AxiosResponse<IGetUserResponse>> => {
  try {
    const data = await api.get(ENDPOINTS.AUTH_GET_CURRENT_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw errToAxiosError(error);
  }
};

export default {
  verifyOTPCode,
  sendOTPCode,
  loginWithEmail,
  getCurrentUser,
};
