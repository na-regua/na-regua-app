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
import {OnTicketPrice} from '../OnTicketPrice/OnTicketPrice';
import {OnTicketServiceInfo} from '../OnTicketServiceInfo/OnTicketServiceInfo';

const OnTicketFinished: React.FC<OnTicketGeneralProps> = ({ticket}) => {
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
        <OnTicketPrice
          service={ticket.service}
          additionalServices={ticket.additional_services}
        />
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
