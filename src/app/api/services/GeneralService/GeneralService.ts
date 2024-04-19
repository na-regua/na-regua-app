import axios, {AxiosError, AxiosResponse} from 'axios';
import ENDPOINTS from '../../endpoints';
import {ICepApiData} from '@/app/models';

const getCepData = async (cep: string): Promise<AxiosResponse<ICepApiData>> => {
  const response = await axios.get<ICepApiData>(ENDPOINTS.VIA_CEP(cep));

  if (!!response.data.erro && response.data.erro) {
    throw new AxiosError('CEP não encontrado');
  }

  return response;
};

export default {getCepData};
