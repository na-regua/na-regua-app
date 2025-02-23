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
import {createNotification, TicketViewActions} from '@/store/slicers';
import {AxiosError} from 'axios';
import {format} from 'date-fns';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {DotStyled} from './styles';

interface CustomerRateTicketModalProps {
  ticket: ITicket;
  dismiss: () => void;
  showServedAt?: boolean;
  closeText?: string;
}

const CustomerRateTicketModal: React.FC<CustomerRateTicketModalProps> = ({
  ticket,
  dismiss,
  showServedAt = true,
  closeText = 'buttons.goBack',
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [ticketRating, setTicketRating] = useState<ITicketRate>({
    rating: ticket.rate?.rating || 0,
    comment: ticket.rate?.comment || '',
  });
  const [isSendingRate, setIsSendingRate] = useState(false);

  const commentMaxLength = 124;

  const onDismiss = () => {
    if (!isSendingRate) {
      dismiss();
    }
  };

  const sendRate = async () => {
    try {
      setIsSendingRate(true);

      const {data} = await TicketsService.rateById(
        ticket._id,
        ticketRating,
        true,
      );

      dispatch(TicketViewActions.setTicket(data.ticket));

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

  const services = useMemo(
    () =>
      `${ticket.service.name}${
        ticket.additional_services
          ? ticket.additional_services.map(s => ' + ' + s.name)
          : ''
      }`,
    [ticket],
  );

  return (
    <Box gap={18}>
      <Typography variant="h4" color="black3">
        {'modals.rate.title'}
      </Typography>
      <BarberInfoCard
        barber={ticket.barber}
        showInfo={false}
        customSubtitle={
          <Box
            direction="row"
            gap={6}
            alignItems="center"
            justifyContent="flex-start">
            <Typography variant="caption" color="placeholder">
              {services}
            </Typography>
            {showServedAt && ticket.servedAt && (
              <>
                <DotStyled />
                <Typography variant="caption" color="placeholder">
                  {format(new Date(ticket.servedAt), t('dates.fullWHalfYear'))}
                </Typography>
              </>
            )}
          </Box>
        }
      />
      <Typography variant="body2" color="black2">
        {'modals.rate.question'}
      </Typography>
      <StarRate
        initialRate={ticketRating.rating}
        onPress={rating => setTicketRating(curr => ({...curr, rating}))}
      />
      {/* TextArea component */}
      <Box
        gap={6}
        alignItems="flex-end"
        justifyContent="flex-end"
        alignSelf="stretch">
        <TextArea
          value={ticketRating?.comment || ''}
          onChange={comment => {
            setTicketRating(curr => ({...curr, comment}));
          }}
          maxLength={commentMaxLength}
          placeholder="modals.rate.comment"
        />
        <Typography variant="caption" translate={false} color="placeholder">
          {ticketRating.comment ? ticketRating.comment.length : 0}/
          {commentMaxLength}
        </Typography>
      </Box>
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
                {closeText}
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
