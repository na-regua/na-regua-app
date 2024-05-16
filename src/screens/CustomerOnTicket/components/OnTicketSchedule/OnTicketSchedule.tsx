import {OnTicketGeneralProps} from '@/app/models';
import {Button, Icons, Typography} from '@/components/atoms';
import React from 'react';
import {
  GappedColumnStyled,
  LineStyled,
  OnTicketActionsStyled,
  OnTicketBarberImageStyled,
  OnTicketBarberInfoStyled,
  OnTicketCardStyled,
  OnTicketIconWrapperStyled,
  OnTicketInfoStyled,
} from '../../styles';

const OnTicketSchedule: React.FC<OnTicketGeneralProps> = ({ticket}) => {
  return (
    <>
      <Typography variant="h2">
        {'customer.onTicket.titles.schedule'}
      </Typography>
      <Typography variant="h3" translateProps={{time: '12/02'}}>
        {'customer.onTicket.subtitles.lastUpdate'}
      </Typography>
      <OnTicketCardStyled>
        <GappedColumnStyled gap={18}>
          <OnTicketBarberInfoStyled>
            <OnTicketBarberImageStyled
              source={{uri: ticket.barber.avatar.url}}
            />
            <Typography variant="body1">{ticket.barber.name}</Typography>
          </OnTicketBarberInfoStyled>
          <LineStyled />
          {ticket.schedule && (
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
      </OnTicketCardStyled>
      <OnTicketActionsStyled>
        <Button title="buttons.leave" variant="ghost" colorScheme="danger" />
        <Button title="customer.onTicket.buttons.beLate" />
      </OnTicketActionsStyled>
    </>
  );
};

export {OnTicketSchedule};
