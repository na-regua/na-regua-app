import {TicketsService} from '@/app/api';
import {ITicket, ITicketRate} from '@/app/models';
import {
  BarberInfoCard,
  Box,
  Button,
  Icons,
  StarRate,
  TextArea,
  Typography,
} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

interface CustomerRateTicketModalProps {
  ticket: ITicket;
  dismiss: () => void;
}

const CustomerRateTicketModal: React.FC<CustomerRateTicketModalProps> = ({
  ticket,
  dismiss,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [ticketRating, setTicketRating] = useState<ITicketRate>({
    rating: 0,
    comment: '',
  });
  const [isSendingRate, setIsSendingRate] = useState(false);

  const onDismiss = () => {
    if (!isSendingRate) {
      dismiss();
    }
  };

  const sendRate = async () => {
    try {
      setIsSendingRate(true);

      await TicketsService.rateById(ticket._id, ticketRating, true);

      setIsSendingRate(false);

      dismiss();
    } catch (error) {
      setIsSendingRate(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'rate_ticket',
              message: `erros.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  return (
    <Box gap={18}>
      <Typography variant="h4" color="black3">
        {'modals.rate.title'}
      </Typography>
      <BarberInfoCard barber={ticket.barber} showInfo={false} />
      <Typography variant="body2" color="black2">
        {'modals.rate.question'}
      </Typography>
      <StarRate
        initialRate={ticketRating.rating}
        onPress={rating => setTicketRating(curr => ({...curr, rating}))}
      />
      {/* TextArea component */}
      <TextArea
        value={ticketRating?.comment || ''}
        onChange={comment => setTicketRating(curr => ({...curr, comment}))}
        placeholder="modals.rate.comment"
      />
      <Box
        gap={18}
        justifyContent="space-between"
        direction="row"
        alignItems="center">
        <Button
          variant="ghost"
          colorScheme="primary"
          onPress={onDismiss}
          customContent={
            <Box
              gap={6}
              direction="row"
              alignItems="center"
              justifyContent="center">
              <Icons.ArrowLeftIcon color="primary" disabled />
              <Typography variant="button" color="primary">
                {'customer.cut.buttons.other'}
              </Typography>
            </Box>
          }
        />
        <Button
          title="modals.rate.buttons.rate"
          fillSpace
          onPress={sendRate}
          loading={isSendingRate}
        />
      </Box>
    </Box>
  );
};

export default CustomerRateTicketModal;
