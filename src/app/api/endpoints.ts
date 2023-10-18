const ENDPOINTS = {
  /**
   * Others
   * */
  VIA_CEP: (cep: string) => `https://viacep.com.br/ws/${cep}/json/`,
  /**
   * Barbers
   * */
  BARBERS_SIGN_UP: '/barbers/sign-up',
  BARBERS_LIST: '/barbers',
  BARBERS_BY_TOKEN: '/barbers/token',
  /**
   * Workers
   * */
  WORKERS_LIST: '/workers',
  /**
   * Auth
   * */
  AUTH_VERIFY_WHATSAPP_CODE: 'auth/verify/whatsapp-code',
  AUTH_SEND_WHATSAPP_CODE: 'auth/send/whatsapp-code',
  AUTH_LOGIN_EMAIL: 'auth/login/email',
  AUTH_GET_CURRENT_USER: 'auth/me',
};

export type TEndpoints = typeof ENDPOINTS;

export default ENDPOINTS;
