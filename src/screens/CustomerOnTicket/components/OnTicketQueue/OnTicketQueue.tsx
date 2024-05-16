import {OnTicketGeneralProps} from '@/app/models';
import {Button, Icons, Typography} from '@/components/atoms';
import React from 'react';
import {
  GappedColumnStyled,
  LineStyled,
  OnTicketActionsStyled,
  OnTicketBarberImageStyled,
  OnTicketBarberInfoStyled,
  OnTicketCardGroupStyled,
  OnTicketCardStyled,
  OnTicketIconWrapperStyled,
  OnTicketInfoStyled,
  TicketLineCornerStyled,
  TicketLineStrokeStyled,
  TicketLineStyled,
} from '../../styles';
import {format} from 'date-fns';

const OnTicketQueue: React.FC<OnTicketGeneralProps> = ({ticket}) => {
  return (
    <GappedColumnStyled gap={18}>
      <GappedColumnStyled gap={6}>
        <Typography variant="h2">{'customer.onTicket.titles.queue'}</Typography>
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
              {ticket.barber.avatar && ticket.barber.avatar.url && (
                <OnTicketBarberImageStyled
                  source={{uri: ticket.barber.avatar.url}}
                />
              )}
              <Typography variant="body1">{ticket.barber.name}</Typography>
            </OnTicketBarberInfoStyled>
            <LineStyled />
            {ticket.queue && (
              <GappedColumnStyled gap={18}>
                <OnTicketInfoStyled>
                  <OnTicketIconWrapperStyled>
                    <Icons.UserIcon width={24} height={24} color="white3" />
                  </OnTicketIconWrapperStyled>
                  <GappedColumnStyled>
                    <Typography variant="body1">
                      {ticket.queue?.position}
                    </Typography>
                    <Typography variant="caption" color="placeholder">
                      {'customer.onTicket.info.position'}
                    </Typography>
                  </GappedColumnStyled>
                </OnTicketInfoStyled>
              </GappedColumnStyled>
            )}
          </GappedColumnStyled>
        </OnTicketCardGroupStyled>
        <TicketLineStyled>
          <TicketLineCornerStyled left />
          <TicketLineStrokeStyled />
          <TicketLineCornerStyled right />
        </TicketLineStyled>
        <OnTicketCardGroupStyled>
          <Typography
            textAlign="center"
            variant="h2"
            color="primary"
            translateProps={{value: ticket.service.price}}>
            {'currency.format'}
          </Typography>
        </OnTicketCardGroupStyled>
      </OnTicketCardStyled>
      <OnTicketActionsStyled>
        <Button title="buttons.leave" variant="ghost" colorScheme="danger" />
        <Button title="customer.onTicket.buttons.beLate" />
      </OnTicketActionsStyled>
    </GappedColumnStyled>
  );
};

export {OnTicketQueue};
