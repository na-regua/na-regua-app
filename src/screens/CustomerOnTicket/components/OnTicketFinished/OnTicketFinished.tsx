import {OnTicketGeneralProps} from '@/app/models';
import {
  BarberInfoCard,
  Box,
  Button,
  Modal,
  StarRate,
  Typography,
} from '@/components/atoms';
import {CustomerRateTicketModal} from '@/components/modals';
import {Colors, Metrics} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {format} from 'date-fns';
import React, {useRef} from 'react';
import {
  LineStyled,
  OnTicketActionsStyled,
  OnTicketCardGroupStyled,
  OnTicketCardStyled,
  OnTicketLineCornerStyled,
  OnTicketLineStrokeStyled,
  OnTicketLineStyled,
} from '../../styles';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';

const OnTicketFinished: React.FC<OnTicketGeneralProps> = ({
  ticket,
  totalPrice,
}) => {
  const rateModalRef = useRef<BottomSheetModal>(null);

  const showRateModal = () => {
    rateModalRef.current?.present();
  };

  return (
    <Box gap={18}>
      {/* Ticket title */}
      <Box gap={6}>
        <Typography variant="h2">
          {'customer.onTicket.titles.finished'}
        </Typography>
      </Box>
      {/* Card */}
      <OnTicketCardStyled>
        {/* Attendance info */}
        <OnTicketCardGroupStyled>
          <Box gap={18} alignSelf="stretch" width={'100%'}>
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
            {/* Rate preview*/}
            {ticket.rate && (
              <Box gap={18} alignSelf="stretch">
                <Typography variant="body1" color="black2">
                  {'customer.onTicket.subtitles.rate'}
                </Typography>
                <Box
                  gap={6}
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="stretch">
                  <StarRate disabled initialRate={ticket.rate.rating} />
                  <Typography
                    variant="caption"
                    color="black1"
                    style={{fontStyle: 'italic'}}>
                    {ticket.rate.comment
                      ? `"${ticket.rate.comment}"`
                      : 'customer.onTicket.info.noComment'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </OnTicketCardGroupStyled>

        {/* Line */}
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
          {ticket.servedAt && (
            <Box
              alignSelf="stretch"
              alignItems="center"
              justifyContent="center">
              <Typography variant="body1" color="black1" translate={false}>
                {format(new Date(ticket.servedAt), 'dd/MM/yyyy HH:mm')}
              </Typography>
            </Box>
          )}
        </Box>
      </OnTicketCardStyled>
      {/* Actions */}
      <OnTicketActionsStyled>
        <Button title="buttons.save" colorScheme="secondary" fillSpace />
        <Button
          title="customer.onTicket.buttons.rate"
          colorScheme="primary"
          fillSpace
          onPress={showRateModal}
        />
      </OnTicketActionsStyled>
      <Modal
        ref={rateModalRef}
        height={415 + Metrics.unitX3}
        backdropBackgroundColor={Colors.main}>
        <CustomerRateTicketModal
          ticket={ticket}
          dismiss={() => rateModalRef.current?.dismiss()}
        />
      </Modal>
    </Box>
  );
};

export {OnTicketFinished};
