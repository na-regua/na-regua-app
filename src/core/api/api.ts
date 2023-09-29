import axios, {AxiosError} from 'axios';

export function errToAxiosError(err: any): AxiosError {
  const {message, code, config, request, response} = err;

  return new AxiosError(message, code, config, request, response);
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default api;
