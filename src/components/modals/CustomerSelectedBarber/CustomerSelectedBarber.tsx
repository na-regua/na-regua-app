import {IBarber} from '@/app/models';
import {
  BarberInfoCard,
  Box,
  Button,
  Icons,
  Typography,
} from '@/components/atoms';
import {Metrics} from '@/theme';
import React from 'react';
import {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CustomBottomSheetOverlayStyled,
  CustomBottomSheetStyled,
} from './styles';

interface ICustomerSelectedBarberProps {
  onBack: () => void;
  onContinue?: () => void;
  loading?: boolean;
  barber: IBarber;
}

const CustomerSelectedBarber: React.FC<ICustomerSelectedBarberProps> = ({
  onBack,
  onContinue,
  barber,
  loading,
}) => {
  const insets = useSafeAreaInsets();

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
        paddingBottom={insets.bottom + Metrics.platformPadding}
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

        <BarberInfoCard asCard barber={barber} />
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
            onPress={onContinue}
            loading={loading}
          />
        </Box>
      </CustomBottomSheetStyled>
    </CustomBottomSheetOverlayStyled>
  );
};

export default CustomerSelectedBarber;
