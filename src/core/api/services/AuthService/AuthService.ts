import {AxiosError, AxiosResponse} from 'axios';
import api, {errToAxiosError} from '../../api';
import endpoints from '../../endpoints';

const sendWhatsappCode = async (
  phone: string,
): Promise<AxiosResponse<{goToVerify: boolean}> | AxiosError> => {
  try {
    const data = await api.post(endpoints.authSendWhatsappCode, {phone});

    return data;
  } catch (error) {
    return errToAxiosError(error);
  }
};

const verifyWhatsapp = async (
  code: string,
  phone: string,
): Promise<AxiosResponse<any> | AxiosError> => {
  try {
    const data = await api.post(endpoints.authVerifyWhatsappCode, {
      code,
      phone,
    });

    return data;
  } catch (error) {
    return errToAxiosError(error);
  }
};

export default {verifyWhatsapp, sendWhatsappCode};
