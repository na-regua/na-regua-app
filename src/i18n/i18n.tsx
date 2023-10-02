import i18n from 'i18next';

import ptBR from './locales/pt-BR';

import {initReactI18next} from 'react-i18next';
// import {getLocales} from 'react-native-localize';
// getLocales()[0].languageCode,

i18n.use(initReactI18next).init(
  {
    lng: 'pt-BR',
    resources: {
      'pt-BR': {
        translation: ptBR,
      },
    },
    compatibilityJSON: 'v3',
  },
  () => {},
);

export default i18n;
