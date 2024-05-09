import {API_ORIGIN} from '@/app/api';
import {ISocketEvent, SocketUrls} from '@/app/models';
import {AppDispatch, RootState} from '@/store/Store';
import {connectSocket, disconnectSocket} from '@/store/slicers';
import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import {Socket, io} from 'socket.io-client';

const SocketProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {token, isAuthenticated} = useSelector(
    (state: RootState) => state.auth,
  );
  const {subs} = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch<AppDispatch>();

  const {t} = useTranslation();

  const notifyEvent = (socketEvent: ISocketEvent) => {
    console.log('New event received ', socketEvent.event);

    const {event, data} = socketEvent;

    const translatedMessage = t(`socketEvent.${event}`, data).toString();
    PushNotification.localNotification({
      message: translatedMessage,
    });
  };

  const onNotification = (instance: Socket) => {
    if (!subs.some(sub => sub === SocketUrls.NewNotification)) {
      instance.on(SocketUrls.NewNotification, () => {
        console.log('New notification received');
      });
    }
  };

  const onEvent = (instance: Socket) => {
    if (!subs.some(sub => sub === SocketUrls.Event)) {
      instance.on(SocketUrls.Event, (socketEvent: ISocketEvent) => {
        notifyEvent(socketEvent);
      });
    }
  };

  const connect = useCallback(async () => {
    try {
      if (!token) {
        return;
      }

      const instance = io(API_ORIGIN, {
        extraHeaders: {Authorization: `Bearer ${token}`},
      });

      instance.on('connect', () => {
        console.log('Connected to socket server');

        dispatch(connectSocket(instance));
      });

      onNotification(instance);
      onEvent(instance);

      instance.on('disconnect', () => {
        dispatch(disconnectSocket());
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && !!token) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  return <>{children}</>;
};

export {SocketProvider};
