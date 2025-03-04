import {QueueService} from '@/app/api';
import {OnTicketGeneralProps, SocketUrls} from '@/app/models';
import {BarberInfoCard, Box, Button, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {CutThunks} from '@/store/slicers';
import {AppDispatch, RootState} from '@/store/Store';
import {format} from 'date-fns';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  LineStyled,
  OnTicketActionsStyled,
  OnTicketCardStyled,
} from '../../styles';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';

const OnTicketWaiting: React.FC<OnTicketGeneralProps> = ({ticket}) => {
  const {socket, connected} = useSelector((state: RootState) => state.socket);
  const [leaving, setLeaving] = useState(false);
  const navigation = useAppNavigation();

  const dispatch = useDispatch<AppDispatch>();

  const leaveQueue = async () => {
    try {
      setLeaving(true);

      // quit from queue
      await QueueService.userLeave(ticket._id);
      // quit from queue/ticket channels
      if (connected && !!socket) {
        socket.emit(SocketUrls.UserLeaveTicketChannels, {ticketId: ticket._id});
      }
      // update user today user tickets
      await dispatch(CutThunks.fetchTodayTickets());

      navigation.navigate('/customer/home');

      setLeaving(false);
    } catch (error) {
      setLeaving(false);
    }
  };

  return (
    <Box gap={18}>
      <Box gap={6}>
        <Typography variant="h4">
          {'customer.onTicket.titles.pending'}
        </Typography>
        <Typography variant="body2" color="black2">
          {'customer.onTicket.subtitles.pending'}
        </Typography>
        <Typography
          variant="caption"
          color="placeholder"
          translateProps={{
            time: format(new Date(ticket.updatedAt), 'dd/MM/yyyy HH:mm'),
          }}>
          {'customer.onTicket.subtitles.lastUpdate'}
        </Typography>
      </Box>
      <OnTicketCardStyled>
        <Box gap={18} padding={18}>
          <BarberInfoCard barber={ticket.barber} />
          <LineStyled />
          <Box gap={12}>
            <Typography variant="body1" color="black2">
              {'customer.onTicket.subtitles.attendanceInfo'}
            </Typography>
            <OnTicketServiceInfo service={ticket.service} />
          </Box>
        </Box>
      </OnTicketCardStyled>
      <OnTicketActionsStyled>
        <Button
          title="buttons.leave"
          fillSpace
          colorScheme="danger"
          onPress={leaveQueue}
          loading={leaving}
        />
      </OnTicketActionsStyled>
    </Box>
  );
};

export {OnTicketWaiting};
