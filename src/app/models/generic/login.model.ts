export type TLoginSteps = 'welcome' | 'e-mail' | 'phone' | 'verify-code';

export interface ILoginMailFormData {
  email: string;
  password: string;
}

export interface ILoginPhoneFormData {
  phone: string;
}
