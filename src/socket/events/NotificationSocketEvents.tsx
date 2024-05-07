import {ISocketEvent, SocketUrls} from '@/app/models';
import {AppDispatch} from '@/store/Store';
import {createNotification, fetchUserNotifications} from '@/store/slicers';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useSocket} from '../SocketProvider/SocketProvider';
import {Notification} from 'react-native-notifications';

const NotificationSocketEvents = () => {
  const {socket} = useSocket();
  const {t} = useTranslation();
  const [localPush, setLocalPush] = useState<Notification[]>([]);

  const [subs, setSubs] = useState<SocketUrls[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const notifyEvent = (socketEvent: ISocketEvent) => {
    console.log('New event received', socketEvent);

    const {event, data} = socketEvent;

    const translatedMessage = t(`socketEvent.${event}`, data).toString();

    // dispatch(
    //   createNotification({
    //     id: event,
    //     message: translatedMessage,
    //     type: 'default',
    //   }),
    // );
  };

  const onNotificationEvent = useCallback(() => {
    if (!!socket && !subs.includes(SocketUrls.NewNotification)) {
      console.log('Subscribing to new events');

      socket.on(SocketUrls.Event, (socketEvent: ISocketEvent) => {
        notifyEvent(socketEvent);
      });

      setSubs([...subs, SocketUrls.Event]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const onNewNotification = useCallback(() => {
    if (!!socket && !subs.includes(SocketUrls.NewNotification)) {
      console.log('Subscribing to new notification event');

      socket.on(SocketUrls.NewNotification, () => {
        console.log('New notification received');

        dispatch(fetchUserNotifications());
      });

      setSubs([...subs, SocketUrls.NewNotification]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    onNewNotification();
  }, [onNewNotification]);

  useEffect(() => {
    onNotificationEvent();
  }, [onNotificationEvent]);

  return <></>;
};

export {NotificationSocketEvents};
