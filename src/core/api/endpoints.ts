const endpoints = {
  barbersPreSignIn: '/barbers/pre-signin',
  getBarbers: '/barbers',
  viaCep: (cep: string) => `https://viacep.com.br/ws/${cep}/json/`,
  authVerifyWhatsappCode: '/verify/whatsapp-code',
  authSendWhatsappCode: '/send/whatsapp-code',
};

export type TEndpoints = typeof endpoints;

export default endpoints;
