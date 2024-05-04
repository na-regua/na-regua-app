enum ENDPOINTS {
  /**
   * Others
   * */
  VIA_CEP = 'https://viacep.com.br/ws/:cep/json/',
  /**
   * Barbers
   * */
  BARBERS_SIGN_UP = '/barbers/sign-up',
  BARBERS_LIST = '/barbers',
  BARBERS_BY_TOKEN = '/barbers/token',
  BARBERS_UPDATE = '/barbers/',
  BARBERS_COMPLETE_PROFILE = '/barbers/complete-profile',
  /**
   * Workers
   * */
  WORKERS_LIST = '/workers',
  WORKERS_CREATE = '/workers',
  WORKERS_DELETE = '/workers/:id',
  WORKERS_UPDATE = '/workers/:id',
  /**
   * Users
   * */
  USERS_UPDATE = '/users/:id',
  /**
   * Files
   * */
  FILES_BARBER = '/files/barber',
  FILES_USER = '/files/user',
  FILES_UPDATE_BARBER_AVATAR = '/files/:avatarId/barber',
  FILES_UPDATE_BARBER_THUMBS = '/files/barber/thumb/:thumbId',
  FILES_UPLOAD_BARBER_THUMBS = '/files/barber/thumb/',
  FILES_DELETE_BARBER_THUMBS = '/files/barber/thumb/:thumbId',
  FILES_UPDATE_USER = '/files/barber',
  /**
   * Notifications
   * */
  NOTIFICATION_LIST_BY_USER = '/notifications',
  NOTIFICATION_MARK_AS_VIEWED = '/notifications/:userId/:notificationId',
  NOTIFICATION_MARK_ALL_AS_VIEWED = '/notifications/:userId',
  /**
   * Services
   * */
  SERVICES_LIST = '/services',
  SERVICES_CREATE = '/services',
  SERVICES_UPDATE = '/services/:id',
  SERVICES_DELETE = '/services/:id',
  /**
   * Auth
   * */
  AUTH_VERIFY_CODE = 'auth/verify/code',
  AUTH_SEND_CODE = 'auth/send/code',
  AUTH_LOGIN_EMAIL = 'auth/login/email',
  AUTH_GET_CURRENT_USER = 'auth/me',
}

export type TEndpoints = typeof ENDPOINTS;

export default ENDPOINTS;
