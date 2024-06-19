import {CacheManager} from '@georstat/react-native-image-cache';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React from 'react';
import {Dirs} from 'react-native-file-access';
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

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 12,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 300,
  thumbnailAnimationDuration: 300,
  getCustomCacheKey: (source: string) => {
    // Remove params from the URL for caching images (useful for caching images from Amazons S3 bucket and etc)
    let newCacheKey = source;
    if (source.includes('?')) {
      newCacheKey = source.substring(0, source.lastIndexOf('?'));
    }
    return newCacheKey;
  },
};

function App(): JSX.Element {
  return <CombinedProviders />;
}

export default App;
