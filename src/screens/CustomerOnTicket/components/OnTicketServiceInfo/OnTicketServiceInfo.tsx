import {IBarberService} from '@/app/models';
import {Icons, Typography} from '@/components/atoms';
import React from 'react';
import {
  GappedColumnStyled,
  OnTicketIconWrapperStyled,
  OnTicketInfoStyled,
} from '../../styles';

interface OnTicketServiceInfoProps {
  service: IBarberService;
}

const OnTicketServiceInfo: React.FC<OnTicketServiceInfoProps> = ({service}) => {
  return (
    <OnTicketInfoStyled>
      <OnTicketIconWrapperStyled>
        {service.icon === 'maquina' && (
          <Icons.MaquinaIcon width={24} height={24} color="white3" />
        )}
        {service.icon === 'navalha' && (
          <Icons.NavalhaIcon width={24} height={24} color="white3" />
        )}
        {service.icon === 'pente' && (
          <Icons.PenteIcon width={24} height={24} color="white3" />
        )}
      </OnTicketIconWrapperStyled>
      <GappedColumnStyled>
        <Typography variant="body1" color="black2">
          {service.name}
        </Typography>
        <Typography
          variant="caption"
          color="placeholder"
          translateProps={{
            minutes: service.durationInMinutes,
          }}>
          {'customer.onTicket.info.duration'}
        </Typography>
      </GappedColumnStyled>
    </OnTicketInfoStyled>
  );
};

export {OnTicketServiceInfo};
