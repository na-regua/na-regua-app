import axios, {AxiosError, AxiosResponse} from 'axios';
import ENDPOINTS from '../../endpoints';
import {ICepApiData} from '@/app/models';

async function getCepData(cep: string): Promise<AxiosResponse<ICepApiData>> {
  const removeMasktext = cep.replace(/\D/g, '');

  try {
    const res = await axios.get<ICepApiData>(ENDPOINTS.VIA_CEP(removeMasktext));

    if (!!res.data.erro && res.data.erro) {
      throw new AxiosError('CEP não encontrado');
    }

    return res;
  } catch (error: any) {
    throw new AxiosError(error);
  }
}

export default {getCepData};
