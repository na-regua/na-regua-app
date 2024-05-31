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
  BARBERS_OPEN = '/barbers/open',
  BARBERS_CUSTOMERS = '/barbers/customers',
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
  USERS_LIST = '/users/',
  USERS_CREATE = '/users/',
  USERS_UPDATE = '/users/:id',
  USERS_SEND_WHATSAPP_CODE = '/users/send/whatsapp-code',
  USERS_VERIFY_WHATSAPP_CODE = '/users/verify/whatsapp',
  USERS_DELETE = '/users/:id',
  USERS_FAVORITE_BARBER = '/users/favorite/:barberId',

  /**
   * Files
   * */
  FILES_BARBER = '/files/barber',
  FILES_UPDATE_BARBER_AVATAR = '/files/:avatarId/barber',
  FILES_UPDATE_USER_AVATAR = '/files/:avatarId/user',
  FILES_UPDATE_BARBER_THUMBS = '/files/barber/thumb/:thumbId',
  FILES_UPLOAD_BARBER_THUMBS = '/files/barber/thumb/',
  FILES_DELETE_BARBER_THUMBS = '/files/barber/thumb/:thumbId',
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
  /**
   * Queue
   * */
  QUEUE_CREATE = '/queues/',
  QUEUE_LIST = '/queues/',
  QUEUE_GET_TODAY = '/queues/today',
  QUEUE_BARBER_TODAY = '/queues/:barberId/today',
  QUEUE_LAST_POSITION = '/queues/:queueId/last-position',
  QUEUE_USER_JOIN = '/queues/join/user',
  QUEUE_WORKER_JOIN = '/queues/join/worker',
  QUEUE_WORKER_APPROVE_TICKET = '/queues/worker/approve/:ticketId',
  QUEUE_USER_LEAVE = '/queues/leave/:ticketId',
  QUEUE_WORKER_REJECT_TICKET = '/queues/worker/reject/:ticketId',
  /**
   * Tickets
   * */
  TICKETS_BY_USER_TODAY = '/tickets/user/today',
  TICKETS_BY_USER = '/tickets/user',
}

export type TEndpoints = typeof ENDPOINTS;

export default ENDPOINTS;
