import axios, {AxiosError, AxiosResponse} from 'axios';
import ENDPOINTS from '../../endpoints';
import {ICepApiData} from '@/app/models';

const getCepData = async (cep: string): Promise<AxiosResponse<ICepApiData>> => {
  const replacedCep = ENDPOINTS.VIA_CEP.replace(':cep', cep);

  const response = await axios.get<ICepApiData>(replacedCep);

  if (!!response.data.erro && response.data.erro) {
    throw new AxiosError('CEP não encontrado');
  }

  return response;
};

export default {getCepData};
