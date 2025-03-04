import {NotificationService} from '@/app/api';
import {ISocketEvent, ModalSizes, SocketUrls} from '@/app/models';
import {Icons, Modal} from '@/components/atoms';
import {MuteNotificationsModal} from '@/components/modals';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {CutThunks, SocketActions, TicketViewActions} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  OnTicketFinished,
  OnTicketMissed,
  OnTicketQueue,
  OnTicketWaiting,
} from './components';
import {OnTicketContainerStyled, OnTicketContentStyled} from './styles';

export const OnTicketNotifyNotificationKey = 'onTicketNotify';

const CustomerOnTicket: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/on-ticket'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const {user} = useSelector((state: RootState) => state.auth);
  const {ticket, queue} = useSelector((state: RootState) => state.ticketView);
  const {socket, connected, subs} = useSelector(
    (state: RootState) => state.socket,
  );

  const dispatch = useDispatch<AppDispatch>();

  const muteNotificationsModalRef = useRef<BottomSheetModal>(null);

  const goBack = () => {
    if (ticket?.status === 'served') {
      navigation.navigate('/customer/home');
    }

    navigation.navigate('/customer/home');

    if (connected && !!socket && ticket) {
      socket.emit(SocketUrls.UserLeaveTicketChannels, {ticketId: ticket._id});
    }
  };

  const subscribeToSocketEvents = async () => {
    if (connected && !!socket && ticket) {
      socket.emit(SocketUrls.UserJoinTicketChannels, {ticketId: ticket._id});

      if (!subs.includes(SocketUrls.GetTicket)) {
        socket.on(SocketUrls.GetTicket, data => {
          if (data.ticket) {
            dispatch(TicketViewActions.setTicket(data.ticket));
            dispatch(TicketViewActions.setQueue(data.ticket.queue.queue_dto));
            dispatch(CutThunks.fetchTodayTickets());
          }
        });
        dispatch(SocketActions.addSub(SocketUrls.GetTicket));
      }

      if (!subs.includes(SocketUrls.GetQueue)) {
        socket.on(SocketUrls.GetQueue, data => {
          if (data.queue) {
            dispatch(TicketViewActions.setQueue(data.queue));
          }
        });
        dispatch(SocketActions.addSub(SocketUrls.GetQueue));
      }
    }
  };

  const subscribeToQueueEvents = () => {
    if (connected && !!socket) {
      if (!subs.includes(SocketUrls.QueueEvent)) {
        socket.on(SocketUrls.QueueEvent, (socketEvent: ISocketEvent) => {
          const {event, data} = socketEvent;

          const translatedMessage = t(`socketEvent.${event}`, data).toString();

          NotificationService.pushNotification({
            message: translatedMessage,
          });
        });

        dispatch(SocketActions.addSub(SocketUrls.QueueEvent));
      }
    }
  };

  const cleaningSocketEvents = () => {
    if (connected && !!socket) {
      socket.off(SocketUrls.GetTicket);
      socket.off(SocketUrls.GetQueue);
      socket.off(SocketUrls.QueueEvent);
      socket.emit(SocketUrls.UserLeaveTicketChannels, {ticketId: ticket?._id});
      dispatch(SocketActions.clearSubs());
    }
  };

  const showMuteNotificationsModal = () => {
    muteNotificationsModalRef.current?.present();
  };

  const onChangeMuted = useCallback(() => {
    if (user?.muted) {
      socket?.off(SocketUrls.QueueEvent);
      dispatch(SocketActions.removeSub(SocketUrls.QueueEvent));
    }

    if (!user?.muted) {
      subscribeToQueueEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    onChangeMuted();
  }, [onChangeMuted]);

  useEffect(() => {
    if (connected) {
      subscribeToSocketEvents();
    }

    return () => {
      if (!connected) {
        cleaningSocketEvents();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  if (!ticket) {
    return null;
  }

  return (
    <OnTicketContainerStyled style={insetsStyles}>
      <Header.Container
        justifyContent="space-between"
        direction="row"
        alignItems="center">
        <Header.GoBack pressables={{back: goBack}} iconColor="black2" />

        <Icons.BellIcon
          width={24}
          height={24}
          color={'secondary'}
          strokeWidth={2}
          disabled={false}
          onPress={showMuteNotificationsModal}
          fill={!user?.muted}
        />
      </Header.Container>
      <OnTicketContentStyled>
        {ticket.status === 'pending' && <OnTicketWaiting ticket={ticket} />}
        {ticket.status === 'queue' && queue && (
          <OnTicketQueue ticket={ticket} queue={queue} />
        )}
        {ticket.status === 'served' && (
          <OnTicketFinished
            ticket={ticket}
            cleanSocketEvents={cleaningSocketEvents}
          />
        )}
        {ticket.status === 'missed' && (
          <OnTicketMissed
            ticket={ticket}
            cleanSocketEvents={cleaningSocketEvents}
          />
        )}
        {/* {ticket.status === 'scheduled' && <OnTicketSchedule ticket={ticket} />} */}
      </OnTicketContentStyled>
      {/* Mute modal */}
      <Modal
        ref={muteNotificationsModalRef}
        title={t('modals.muteNotifications.title')}
        height={ModalSizes.MuteNotifications}>
        <MuteNotificationsModal
          modalRef={muteNotificationsModalRef}
          onChangeMuted={onChangeMuted}
        />
      </Modal>
    </OnTicketContainerStyled>
  );
};

export default CustomerOnTicket;
