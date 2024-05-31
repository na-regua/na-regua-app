import {ITicket} from '@/app/models';
import {
  BarberInfoCard,
  Box,
  Button,
  Icons,
  Typography,
} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {TicketViewActions} from '@/store/slicers';
import React, {useState} from 'react';
import {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {
  CustomBottomSheetOverlayStyled,
  CustomBottomSheetStyled,
  OnTicketIconWrapperStyled,
  QueueInfoStyled,
} from './styles';
import {OnTicketServiceInfo} from '@/screens/CustomerOnTicket/components';

interface ICustomerJoinTodayQueueProps {
  onBack: () => void;
  onContinue?: () => void;
  ticket: ITicket;
}

const CustomerJoinTodayQueue: React.FC<ICustomerJoinTodayQueueProps> = ({
  onBack,
  onContinue,
  ticket,
}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const [joining, setJoining] = useState(false);

  const joinQueue = async () => {
    try {
      setJoining(true);

      dispatch(TicketViewActions.setTicketView(ticket));

      if (onContinue) {
        onContinue();
      }

      setJoining(false);

      navigation.navigate('/customer/on-ticket');
    } catch (error) {
      setJoining(false);
    }
  };

  return (
    <CustomBottomSheetOverlayStyled
      onPress={() => {
        onBack();
      }}
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(300)}>
      <CustomBottomSheetStyled
        onPress={event => {
          event.stopPropagation();
        }}
        paddingBottom={insets.bottom - 18}
        entering={SlideInDown.delay(100)}
        exiting={SlideOutDown.duration(300)}>
        <Box gap={6}>
          <Typography variant="h4">
            {'modals.customerJoinTodayQueue.title'}
          </Typography>
          <Typography variant="body2" color="black1">
            {'modals.customerJoinTodayQueue.subtitle'}
          </Typography>
        </Box>

        <BarberInfoCard asCard barber={ticket.barber} />
        <QueueInfoStyled>
          <Box direction="row" alignItems="center" gap={12}>
            <OnTicketIconWrapperStyled>
              <Icons.UserIcon width={24} height={24} color="white3" />
            </OnTicketIconWrapperStyled>
            <Box gap={3}>
              <Typography variant="body1">
                {ticket.queue?.position} º
              </Typography>
              <Typography variant="caption" color="placeholder">
                {'customer.onTicket.info.position'}
              </Typography>
            </Box>
          </Box>
          <OnTicketServiceInfo
            service={ticket.service}
            additionalServices={ticket.additional_services}
          />
        </QueueInfoStyled>

        <Box gap={18} direction="row">
          <Button
            variant="ghost"
            colorScheme="primary"
            onPress={onBack}
            customContent={
              <Box gap={6} direction="row" alignItems="center">
                <Icons.ArrowLeftIcon color="primary" disabled />
                <Typography variant="button" color="primary">
                  {'buttons.goBack'}
                </Typography>
              </Box>
            }
          />
          <Button
            fillSpace
            title="buttons.open"
            onPress={joinQueue}
            loading={joining}
          />
        </Box>
      </CustomBottomSheetStyled>
    </CustomBottomSheetOverlayStyled>
  );
};

export default CustomerJoinTodayQueue;
