import React from 'react';
import './i18n/i18n';
import {CombinedProviders} from './providers';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  popInitialNotification: true,
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  requestPermissions: true,
});

function App(): JSX.Element {
  return <CombinedProviders />;
}

export default App;
