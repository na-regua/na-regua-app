import {API_ORIGIN, NotificationService} from '@/app/api';
import {INotification, ISocketEvent, SocketUrls} from '@/app/models';
import {AppDispatch, RootState} from '@/store/Store';
import {SocketActions} from '@/store/slicers';
import React, {PropsWithChildren, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Socket, io} from 'socket.io-client';

const SocketProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {token, isAuthenticated} = useSelector(
    (state: RootState) => state.auth,
  );
  const {subs} = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch<AppDispatch>();

  const {t} = useTranslation();

  const onNotification = (instance: Socket) => {
    if (!subs.some(sub => sub === SocketUrls.NewNotification)) {
      instance.on(
        SocketUrls.NewNotification,
        ({notification}: {notification: INotification}) => {
          if (notification) {
            const {message, data} = notification;

            const translatedMessage = t(`notification.${message}`, {
              data,
            }).toString();

            NotificationService.pushNotification({
              message: translatedMessage,
            });
          }
        },
      );
    }
  };

  const onEvent = (instance: Socket) => {
    if (!subs.some(sub => sub === SocketUrls.Event)) {
      instance.on(SocketUrls.Event, (socketEvent: ISocketEvent) => {
        const {event, data} = socketEvent;

        const translatedMessage = t(`socketEvent.${event}`, data).toString();

        NotificationService.pushNotification({
          message: translatedMessage,
        });
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

        dispatch(SocketActions.connectSocket(instance));
      });

      onNotification(instance);
      onEvent(instance);

      instance.on('disconnect', () => {
        dispatch(SocketActions.disconnectSocket());
      });
    } catch (error) {
      console.error(error);
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
