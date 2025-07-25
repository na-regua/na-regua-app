import {IBarberService} from '@/app/models';
import {Box, IBoxProps, Typography} from '@/components/atoms';
import React, {useMemo} from 'react';
import {LineStyled} from '../../styles';

interface IOnTicketPriceProps {
  service: IBarberService;
  additionalServices?: IBarberService[];
  showLine?: boolean;
  wrapperProps?: IBoxProps;
}

const OnTicketPrice: React.FC<IOnTicketPriceProps> = ({
  service,
  additionalServices,
  showLine = true,
  wrapperProps,
}) => {
  const totalPrice = useMemo(() => {
    let total = service.price;

    if (additionalServices) {
      additionalServices.forEach(addService => {
        total += addService.price;
      });
    }

    return total;
  }, [additionalServices, service]);

  return (
    <Box
      alignSelf="stretch"
      paddings={{top: 12, bottom: 18, left: 18, right: 18}}
      gap={12}
      {...wrapperProps}>
      <Box gap={6} alignSelf="stretch">
        <Box
          gap={6}
          direction="row"
          justifyContent="space-between"
          alignSelf="stretch">
          <Typography color="placeholder" variant="body2">
            {service.name}
          </Typography>
          <Box direction="row" gap={6}>
            <Typography variant="body1" translate={false}>
              +
            </Typography>
            <Typography variant="body1" translateProps={{value: service.price}}>
              {'currency.format'}
            </Typography>
          </Box>
        </Box>
        <>
          {additionalServices &&
            additionalServices.length > 0 &&
            additionalServices.map((addService, index) => (
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
      {showLine && <LineStyled />}
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
  );
};

export {OnTicketPrice};
