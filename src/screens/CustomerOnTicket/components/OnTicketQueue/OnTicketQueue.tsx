import {QueueService} from '@/app/api';
import {IQueue, OnTicketGeneralProps, SocketUrls} from '@/app/models';
import {
  BarberInfoCard,
  Box,
  Button,
  Icons,
  Typography,
} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {CutThunks, createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';
import {format} from 'date-fns';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  LineStyled,
  OnTicketActionsStyled,
  OnTicketCardGroupStyled,
  OnTicketCardStyled,
  OnTicketIconWrapperStyled,
  OnTicketInfoStyled,
  OnTicketLineCornerStyled,
  OnTicketLineStrokeStyled,
  OnTicketLineStyled,
} from '../../styles';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';

const OnTicketQueue: React.FC<OnTicketGeneralProps & {queue: IQueue}> = ({
  ticket,
  queue,
  totalPrice,
}) => {
  const [leaving, setLeaving] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();
  const {socket, connected} = useSelector((state: RootState) => state.socket);

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

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'user_leave_queue',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  const ticketPosition = useMemo(() => {
    const ticketPositionValue = ticket.queue?.position || 0;
    const queuePositionValue = queue?.current_position || 0;

    if (queuePositionValue > ticketPositionValue) {
      return ticketPositionValue;
    }

    return ticketPositionValue + 1 - queuePositionValue;
  }, [ticket, queue]);

  return (
    <Box gap={18}>
      {/* Ticket title */}
      <Box gap={6}>
        <Typography variant="h2">{'customer.onTicket.titles.queue'}</Typography>
        <Typography
          variant="caption"
          color="placeholder"
          translateProps={{
            time: format(new Date(queue.updatedAt), 'dd/MM/yyyy HH:mm'),
          }}>
          {'customer.onTicket.subtitles.lastUpdate'}
        </Typography>
      </Box>
      {/* Card */}
      <OnTicketCardStyled>
        {/* Attendance info */}
        <OnTicketCardGroupStyled>
          <Box gap={18}>
            <BarberInfoCard barber={ticket.barber} titleVariant="h6" />
            <LineStyled />
            <Box gap={12}>
              <Typography variant="body1" color="black2">
                {'customer.onTicket.subtitles.attendanceInfo'}
              </Typography>
              <Box gap={18}>
                {ticket.queue && (
                  <Box gap={18}>
                    {/* Position */}
                    <OnTicketInfoStyled>
                      <OnTicketIconWrapperStyled>
                        <Icons.UserIcon
                          width={20}
                          height={20}
                          strokeWidth={2}
                          color="white3"
                        />
                      </OnTicketIconWrapperStyled>
                      <Box gap={3}>
                        <Typography variant="body1">
                          {ticketPosition}º
                        </Typography>
                        <Typography variant="caption" color="placeholder">
                          {'customer.onTicket.info.position'}
                        </Typography>
                      </Box>
                    </OnTicketInfoStyled>
                    {/* Prevision */}
                    {/* <OnTicketInfoStyled>
                    <OnTicketIconWrapperStyled>
                      <Icons.UserIcon width={20} height={20} color="white3" />
                    </OnTicketIconWrapperStyled>
                    <Box>
                      <Typography variant="body1" translate={false}>
                        {'10:00'}
                      </Typography>
                      <Typography variant="caption" color="placeholder">
                        {'customer.onTicket.info.prevision'}
                      </Typography>
                    </Box>
                  </OnTicketInfoStyled> */}
                  </Box>
                )}
                <OnTicketServiceInfo
                  service={ticket.service}
                  additionalServices={ticket.additional_services}
                />
              </Box>
            </Box>
          </Box>
        </OnTicketCardGroupStyled>
        <OnTicketLineStyled>
          <OnTicketLineCornerStyled left />
          <OnTicketLineStrokeStyled />
          <OnTicketLineCornerStyled right />
        </OnTicketLineStyled>
        {/* Price session */}
        <Box paddings={{top: 12, bottom: 18, left: 18, right: 18}} gap={12}>
          <Box gap={6} alignSelf="stretch">
            <Box
              gap={6}
              direction="row"
              justifyContent="space-between"
              alignSelf="stretch">
              <Typography color="placeholder" variant="body2">
                {ticket.service.name}
              </Typography>
              <Box direction="row" gap={6}>
                <Typography variant="body1" translate={false}>
                  +
                </Typography>
                <Typography
                  variant="body1"
                  translateProps={{value: ticket.service.price}}>
                  {'currency.format'}
                </Typography>
              </Box>
            </Box>
            <>
              {ticket.additional_services &&
                ticket.additional_services?.length > 0 &&
                ticket.additional_services?.map((addService, index) => (
                  <Box
                    key={index}
                    gap={6}
                    direction="row"
                    justifyContent="space-between"
                    alignSelf="stretch">
                    <Typography color="placeholder" variant="body2">
                      {addService.name}
                    </Typography>
                    <Box direction="row" gap={6}>
                      <Typography variant="body1" translate={false}>
                        +
                      </Typography>
                      <Typography
                        variant="body1"
                        translateProps={{value: addService.price}}>
                        {'currency.format'}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </>
          </Box>
          <LineStyled />
          <Box
            gap={6}
            direction="row"
            justifyContent="space-between"
            alignSelf="stretch">
            <Typography color="placeholder" variant="body2">
              {'customer.onTicket.info.total'}
            </Typography>
            <Typography variant="body1" translateProps={{value: totalPrice}}>
              {'currency.format'}
            </Typography>
          </Box>
        </Box>
      </OnTicketCardStyled>
      {/* Actions */}
      <OnTicketActionsStyled>
        <Button
          title="buttons.leave"
          colorScheme="danger"
          loading={leaving}
          onPress={leaveQueue}
        />
        <Button
          title="customer.onTicket.buttons.beLate"
          colorScheme="secondary"
          fillSpace
        />
      </OnTicketActionsStyled>
    </Box>
  );
};

export {OnTicketQueue};
