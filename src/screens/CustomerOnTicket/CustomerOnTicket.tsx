import {SocketUrls} from '@/app/models';
import {Box, Button, Icons, Modal, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {CutThunks, TicketViewActions} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {OnTicketFinished, OnTicketQueue, OnTicketWaiting} from './components';
import {OnTicketContainerStyled, OnTicketContentStyled} from './styles';

export const OnTicketNotifyNotificationKey = 'onTicketNotify';

const CustomerOnTicket: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/on-ticket'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const {ticket, queue} = useSelector((state: RootState) => state.ticketView);
  const {socket, connected} = useSelector((state: RootState) => state.socket);

  const dispatch = useDispatch<AppDispatch>();

  const shouldNotifyModalRef = useRef<BottomSheetModal>(null);

  const totalPrice = useMemo(() => {
    if (!ticket) {
      return 0;
    }

    let total = ticket.service.price;

    if (ticket.additional_services) {
      ticket.additional_services.forEach(addService => {
        total += addService.price;
      });
    }

    return total;
  }, [ticket]);

  const goBack = () => {
    if (ticket?.status === 'served') {
      navigation.navigate('/customer/home');
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }

    if (connected && !!socket && ticket) {
      socket.emit(SocketUrls.UserLeaveTicketChannels, {ticketId: ticket._id});
    }
  };

  const subscribeToSocketEvents = async () => {
    if (connected && !!socket && ticket) {
      socket.emit(SocketUrls.UserJoinTicketChannels, {ticketId: ticket._id});

      socket.on(SocketUrls.GetTicket, data => {
        if (data.ticket) {
          dispatch(TicketViewActions.setTicket(data.ticket));
          dispatch(TicketViewActions.setQueue(data.ticket.queue.queue_dto));
          dispatch(CutThunks.fetchTodayTickets());
        }
      });

      socket.on(SocketUrls.GetQueue, data => {
        if (data.queue) {
          dispatch(TicketViewActions.setQueue(data.queue));
        }
      });
    }
  };

  const cleaningSocketEvents = () => {
    if (connected && !!socket) {
      socket.off(SocketUrls.GetTicket);
      socket.off(SocketUrls.GetQueue);
    }
  };

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
          color="black2"
          strokeWidth={2}
          disabled={false}
        />
      </Header.Container>
      <OnTicketContentStyled>
        {ticket.status === 'pending' && (
          <OnTicketWaiting ticket={ticket} totalPrice={totalPrice} />
        )}
        {ticket.status === 'queue' && queue && (
          <OnTicketQueue
            ticket={ticket}
            queue={queue}
            totalPrice={totalPrice}
          />
        )}
        {ticket.status === 'served' && (
          <OnTicketFinished ticket={ticket} totalPrice={totalPrice} />
        )}
        {/* {ticket.status === 'scheduled' && <OnTicketSchedule ticket={ticket} />} */}
      </OnTicketContentStyled>
      {/* Mute modal */}
      <Modal ref={shouldNotifyModalRef} height={120}>
        <Box gap={18}>
          <Typography variant="body2" color="black2">
            {'asd'}
          </Typography>
          <Box
            direction="row"
            gap={18}
            alignItems="center"
            justifyContent="space-between">
            <Button title="asd" />
          </Box>
        </Box>
      </Modal>
    </OnTicketContainerStyled>
  );
};

export default CustomerOnTicket;
