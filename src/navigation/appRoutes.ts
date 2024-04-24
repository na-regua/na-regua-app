export enum APP_ROUTES {
  BARBER_SIGN_UP = '/barber/sign-up',
  BARBER_PRE_SIGN_UP = '/barber/pre-sign-up',
  BARBER_SETTINGS = '/barber/settings',
  BARBER_WORKERS = '/barber/settings/workers',
  BARBER_SERVICES = '/barber/settings/services',
  BARBER_SERVICES_CONFIG = '/barber/settings/services/config',
  BARBER_PLAN = '/barber/plan',
  BARBER_QUEUE = '/barber/queue',
  BARBER_SCHEDULE = '/barber/schedule',
  BARBER_BILLING = '/barber/billing',
  BARBER_COMPLETE_QR = '/barber/complete-qr',
  BARBER_SETTINGS_PROFILE = '/barber/settings/profile',

  GENERIC_LOGIN = '/generic/login',
  GENERIC_LOGIN_BARBER = '/generic/login/barber',
  GENERIC_LOGIN_CUSTOMER = '/generic/login/customer',
}

export type TRootStackParamList = {
  '/barber/sign-up': undefined;
  '/barber/pre-sign-up': undefined;
  '/barber/settings': undefined;
  '/barber/settings/workers': {showContinue: boolean; hideBottomNav?: boolean};
  '/barber/settings/services': {showContinue: boolean; hideBottomNav?: boolean};
  '/barber/settings/services/config'?: {hideBottomNav?: boolean};
  '/barber/settings/profile'?: {hideBottomNav?: boolean};
  '/barber/plan': {hideBottomNav?: boolean};
  '/barber/queue': undefined;
  '/barber/schedule': undefined;
  '/barber/billing': undefined;
  '/barber/complete-qr'?: {hideBottomNav?: boolean};

  '/generic/login': undefined;
  '/generic/login/customer': undefined;
  '/generic/login/barber': undefined;
};

export type TRouteName = keyof TRootStackParamList;
