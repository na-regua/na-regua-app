export const APP_ROUTES = {
  BARBER_SIGN_UP: '/barber/sign-up',
  BARBER_PRE_SIGN_UP: '/barber/pre-sign-up',
  BARBER_SETTINGS: '/barber/settings',
  BARBER_WORKERS: '/barber/settings/workers',
  BARBER_SERVICES: '/barber/settings/services',
  BARBER_SERVICES_CONFIG: '/barber/settings/services/config',
  BARBER_PLAN: '/barber/plan',
  BARBER_QUEUE: '/barber/queue',
  BARBER_SCHEDULE: '/barber/schedule',
  BARBER_BILLING: '/barber/billing',
  BARBER_COMPLETE_QR: '/barber/complete-qr',
  BARBER_SETTINGS_PROFILE: '/barber/settings/profile',

  GENERIC_LOGIN: '/generic/login',
  GENERIC_VERIFY_PHONE: '/generic/verify-phone',
};

export type TRootStackParamList = {
  '/barber/sign-up': undefined;
  '/barber/pre-sign-up': undefined;
  '/barber/settings': undefined;
  '/barber/settings/workers': {showContinue: boolean};
  '/barber/settings/services': {showContinue: boolean};
  '/barber/settings/services/config': undefined;
  '/barber/settings/profile': undefined;
  '/barber/plan': undefined;
  '/barber/queue': undefined;
  '/barber/schedule': undefined;
  '/barber/billing': undefined;
  '/barber/complete-qr': undefined;

  '/generic/login': undefined;
  '/generic/verify-phone': undefined;
};

export type TRouteName = keyof TRootStackParamList;
