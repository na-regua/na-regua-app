import {Notify} from '@/components/atoms';
import {RootState} from '@/store/Store';
import {Metrics} from '@/theme';
import React, {useCallback, useEffect} from 'react';
import {ViewStyle} from 'react-native';
import {Notification, Notifications} from 'react-native-notifications';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

const StyledNotifyWrapper = styled.View`
  position: absolute;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;

  width: ${Metrics.screenWidth}px;
  padding: 18px;
  gap: 18px;
  z-index: 99999999;
`;

interface INotifyProvider {}

const NotifyProvider: React.FC<INotifyProvider> = () => {
  const insets = useSafeAreaInsets();
  const insetBottomStyle: ViewStyle = {
    top: insets.top + 48,
  };

  const {systemNotifications} = useSelector((state: RootState) => state.notify);

  const initPushNotificationConfig = useCallback(() => {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (notification: Notification, completion) => {
        console.log(
          `Notification received in foreground: ${notification.title} : ${notification.body}`,
        );
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );
  }, []);

  useEffect(() => {
    initPushNotificationConfig();
  }, [initPushNotificationConfig]);

  return (
    <StyledNotifyWrapper style={insetBottomStyle}>
      {systemNotifications.map((notify, index) => (
        <Notify {...notify} key={index} />
      ))}
    </StyledNotifyWrapper>
  );
};

export default NotifyProvider;
