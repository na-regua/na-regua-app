import {LinkingOptions} from '@react-navigation/native';

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
  '/barber/sign-up'?: {};
  '/barber/pre-sign-up'?: {};
  '/barber/settings'?: {};
  '/barber/settings/workers': {showContinue: boolean; hideBottomNav?: boolean};
  '/barber/settings/services': {showContinue: boolean; hideBottomNav?: boolean};
  '/barber/settings/services/config'?: {hideBottomNav?: boolean};
  '/barber/settings/profile'?: {hideBottomNav?: boolean};
  '/barber/plan': {hideBottomNav?: boolean};
  '/barber/queue'?: {};
  '/barber/queue/fs'?: {hideBottomNav?: boolean};
  '/barber/schedule'?: {};
  '/barber/billing'?: {};
  '/barber/complete-qr'?: {hideBottomNav?: boolean};

  '/generic/login'?: {};
  '/generic/login/customer'?: {};
  '/generic/login/barber'?: {};

  '/user/notifications'?: {hideBottomNav: boolean};
  '/user/permissions'?: {hideBottomNav: boolean};

  '/customer/sign-up'?: {};
  '/customer/sign-up/verify'?: {
    phone?: number;
  };
  '/customer/home'?: {};
  '/customer/settings'?: {};
  '/customer/settings/profile'?: {};
  '/customer/settings/history'?: {};
  '/customer/settings/favorites'?: {};
  '/customer/cut'?: {};
  '/customer/qr-scanner'?: {};
  '/customer/on-ticket'?: {
    hideBottomNav?: boolean;
  };
};

export type TRouteName = keyof TRootStackParamList;

export enum LinkingPrefixes {
  Default = 'nareguaapp://',
  Barber = 'nareguaapp://barber/{{code}}',
}

export const LinkingConfig: LinkingOptions<TRootStackParamList> = {
  prefixes: [LinkingPrefixes.Default],
  config: {
    screens: {
      '/generic/login/customer': 'login-customer',
    },
  },
};
