import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React from 'react';
import PushNotification from 'react-native-push-notification';
import './i18n/i18n';
import {CombinedProviders} from './providers';

PushNotification.configure({
  onRegister: function (token) {
    console.log('notif token:', token);
  },
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRemoteFetch: function (notification) {
    console.log('REMOTE FETCH', notification);
  },
  popInitialNotification: true,
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  requestPermissions: true,
});

export const androidChannelId = 'na-regua';

PushNotification.createChannel(
  {
    channelId: androidChannelId, // (required)
    channelName: 'Na Régua', // (required)
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

function App(): JSX.Element {
  return <CombinedProviders />;
}

export default App;
