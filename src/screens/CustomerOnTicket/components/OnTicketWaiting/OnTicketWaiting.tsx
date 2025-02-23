import {OnTicketGeneralProps} from '@/app/models';
import {BarberInfoCard, Box, Button, Typography} from '@/components/atoms';
import {format} from 'date-fns';
import React from 'react';
import {
  LineStyled,
  OnTicketActionsStyled,
  OnTicketCardStyled,
} from '../../styles';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';

const OnTicketWaiting: React.FC<OnTicketGeneralProps> = ({ticket}) => {
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
        <Button title="buttons.leave" fillSpace colorScheme="danger" />
      </OnTicketActionsStyled>
    </Box>
  );
};

export {OnTicketWaiting};
