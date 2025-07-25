import {IBarberService} from '@/app/models';
import {Box, Icons, Typography} from '@/components/atoms';
import React from 'react';
import {
  AdditionalServiceBadgeStyled,
  OnTicketIconWrapperStyled,
  OnTicketInfoStyled,
} from './styles';

interface OnTicketServiceInfoProps {
  service: IBarberService;
  additionalServices?: IBarberService[];
}

const OnTicketServiceInfo: React.FC<OnTicketServiceInfoProps> = ({
  service,
  additionalServices,
}) => {
  return (
    <OnTicketInfoStyled>
      <OnTicketIconWrapperStyled>
        {service.icon === 'maquina' && (
          <Icons.MaquinaIcon width={22} height={22} color="white3" />
        )}
        {service.icon === 'navalha' && (
          <Icons.NavalhaIcon
            width={22}
            strokeWidth={1}
            height={22}
            color="white3"
          />
        )}
        {service.icon === 'pente' && (
          <Icons.PenteIcon width={22} height={22} color="white3" />
        )}
      </OnTicketIconWrapperStyled>
      <Box gap={3}>
        <Typography variant="body1" color="black2">
          {service.name}
        </Typography>
        <Box direction="row" alignItems="center" justifyContent="flex-start">
          {additionalServices && additionalServices.length > 0 ? (
            additionalServices.map((addService, index) => (
              <AdditionalServiceBadgeStyled key={index}>
                <Typography variant="tip" weight="medium" color="white3">
                  + {addService.name}
                </Typography>
              </AdditionalServiceBadgeStyled>
            ))
          ) : (
            <Typography variant="caption" color="placeholder">
              {'Nenhum serviço adicional.'}
            </Typography>
          )}
        </Box>
      </Box>
    </OnTicketInfoStyled>
  );
};

export {OnTicketServiceInfo};
