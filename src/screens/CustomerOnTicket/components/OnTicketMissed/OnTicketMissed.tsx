import {OnTicketGeneralProps} from '@/app/models';
import {BarberInfoCard, Box, Typography} from '@/components/atoms';
import {format} from 'date-fns';
import React from 'react';
import {LineStyled, OnTicketCardStyled} from '../../styles';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';

const OnTicketMissed: React.FC<OnTicketGeneralProps> = ({ticket}) => {
  return (
    <Box gap={18}>
      {/* Ticket title */}
      <Box gap={6}>
        <Typography variant="h2">
          {'customer.onTicket.titles.missed'}
        </Typography>
        {ticket.type === 'queue' && (
          <Typography variant="body2" color="black2">
            {'customer.onTicket.subtitles.missedQueue'}
          </Typography>
        )}
        {ticket.missedAt && (
          <Typography
            variant="caption"
            color="placeholder"
            translateProps={{
              time: format(new Date(ticket.missedAt), 'dd/MM/yyyy HH:mm'),
            }}>
            {'customer.onTicket.subtitles.missedAt'}
          </Typography>
        )}
      </Box>
      {/* Card */}
      <OnTicketCardStyled>
        {/* Attendance info */}
        <Box padding={18} gap={18} alignSelf="stretch" width={'100%'}>
          <BarberInfoCard barber={ticket.barber} titleVariant="h6" />
          <LineStyled />
          <Box gap={12}>
            <Typography variant="body1" color="black2">
              {'customer.onTicket.subtitles.attendanceInfo'}
            </Typography>
            <Box gap={18}>
              <OnTicketServiceInfo
                service={ticket.service}
                additionalServices={ticket.additional_services}
              />
            </Box>
          </Box>
        </Box>
      </OnTicketCardStyled>
    </Box>
  );
};

export {OnTicketMissed};
