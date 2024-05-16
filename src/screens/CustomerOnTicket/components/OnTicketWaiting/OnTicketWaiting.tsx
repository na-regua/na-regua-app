import {OnTicketGeneralProps} from '@/app/models';
import {Button, Typography} from '@/components/atoms';
import React from 'react';
import {
  GappedColumnStyled,
  LineStyled,
  OnTicketActionsStyled,
  OnTicketBarberImageStyled,
  OnTicketBarberInfoStyled,
  OnTicketCardGroupStyled,
  OnTicketCardStyled,
} from '../../styles';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';
import {format} from 'date-fns';

const OnTicketWaiting: React.FC<OnTicketGeneralProps> = ({ticket}) => {
  return (
    <GappedColumnStyled gap={18}>
      <GappedColumnStyled gap={6}>
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
      </GappedColumnStyled>
      <OnTicketCardStyled>
        <OnTicketCardGroupStyled>
          <GappedColumnStyled gap={18}>
            <OnTicketBarberInfoStyled>
              <OnTicketBarberImageStyled
                source={{uri: ticket.barber.avatar.url}}
              />

              <Typography variant="body1">{ticket.barber.name}</Typography>
            </OnTicketBarberInfoStyled>
            <LineStyled />
            <OnTicketServiceInfo service={ticket.service} />
          </GappedColumnStyled>
        </OnTicketCardGroupStyled>
      </OnTicketCardStyled>
      <OnTicketActionsStyled>
        <Button title="buttons.leave" variant="ghost" colorScheme="danger" />
        <Button
          title="customer.onTicket.buttons.beLate"
          fillSpace
          colorScheme="primary"
          disabled
        />
      </OnTicketActionsStyled>
    </GappedColumnStyled>
  );
};

export {OnTicketWaiting};
