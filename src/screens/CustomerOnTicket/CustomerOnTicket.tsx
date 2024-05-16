import {SocketUrls} from '@/app/models';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TicketViewActions} from '@/store/slicers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {OnTicketQueue, OnTicketWaiting} from './components';
import {OnTicketContainerStyled, OnTicketContentStyled} from './styles';

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

  const {ticket} = useSelector((state: RootState) => state.ticketView);
  const {socket, connected} = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch<AppDispatch>();

  const goBack = () => {
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
          dispatch(TicketViewActions.setTicketView(data.ticket));
        }
      });
    }
  };

  const cleaningSocketEvents = () => {
    if (connected && !!socket) {
      socket.off(SocketUrls.GetTicket);
    }
  };

  useEffect(() => {
    subscribeToSocketEvents();

    return () => {
      cleaningSocketEvents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ticket) {
    return null;
  }

  return (
    <OnTicketContainerStyled style={insetsStyles}>
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
      </Header.Container>
      <OnTicketContentStyled>
        {ticket.status === 'pending' && <OnTicketWaiting ticket={ticket} />}
        {ticket.status === 'queue' && <OnTicketQueue ticket={ticket} />}
        {/* {ticket.status === 'scheduled' && <OnTicketSchedule ticket={ticket} />} */}
      </OnTicketContentStyled>
    </OnTicketContainerStyled>
  );
};

export default CustomerOnTicket;
