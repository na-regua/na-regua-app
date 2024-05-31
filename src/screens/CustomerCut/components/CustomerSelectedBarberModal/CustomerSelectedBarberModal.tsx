import {
  BarberInfoCard,
  Box,
  Button,
  Icons,
  Typography,
} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {CutActions, CutThunks} from '@/store/slicers';
import React, {useState} from 'react';
import {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomBottomSheetOverlayStyled,
  CustomBottomSheetStyled,
} from './styles';

interface ICustomerJoinTodayQueueProps {}

const CustomerSelectedBarberModal: React.FC<
  ICustomerJoinTodayQueueProps
> = ({}) => {
  const [loading, setLoading] = useState(false);
  const {selectedBarber} = useSelector((state: RootState) => state.cut);

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();

  if (!selectedBarber) {
    return null;
  }

  const openBarberAttendance = async () => {
    setLoading(true);

    await dispatch(CutThunks.fetchBarberServicesByBarberId(selectedBarber._id));
    await dispatch(
      CutThunks.fetchBarberTodayQueueByBarberId(selectedBarber._id),
    );

    dispatch(CutActions.setCutStep('attendance'));
    dispatch(CutActions.setAttendanceType('queue'));

    setLoading(false);
    dispatch(CutActions.setShowSelectedModal(false));
  };

  const onBack = () => {
    dispatch(CutActions.setShowSelectedModal(false));
    dispatch(CutActions.setCutSelectedBarber(null));
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
            {'modals.customerSelectedBarber.title'}
          </Typography>
        </Box>

        <BarberInfoCard asCard barber={selectedBarber} />
        <Box gap={18} direction="row">
          <Button
            variant="ghost"
            colorScheme="primary"
            onPress={onBack}
            disabled={loading}
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
            onPress={openBarberAttendance}
            loading={loading}
          />
        </Box>
      </CustomBottomSheetStyled>
    </CustomBottomSheetOverlayStyled>
  );
};

export {CustomerSelectedBarberModal};
