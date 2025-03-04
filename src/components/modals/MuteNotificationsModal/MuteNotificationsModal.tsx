import {UserService} from '@/app/api';
import {Box, Button, Typography} from '@/components/atoms';
import {AuthThunks} from '@/store/slicers';
import {AppDispatch} from '@/store/Store';
import {Metrics} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AxiosError} from 'axios';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

type Props = {
  modalRef: React.RefObject<BottomSheetModal | null>;
  onChangeMuted?: () => void;
};

const MuteNotificationsModal: React.FC<Props> = ({modalRef, onChangeMuted}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const muteNotifications = async (shouldMute: boolean) => {
    try {
      await UserService.muteNotifications(shouldMute);

      await dispatch(AuthThunks.getCurrentUser());

      modalRef.current?.dismiss();

      onChangeMuted && onChangeMuted();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  return (
    <Box direction="column" gap={Metrics.unitX3}>
      <Typography variant="body2" color="black2">
        {'modals.muteNotifications.subtitle'}
      </Typography>
      <Box direction="row" alignItems="center" gap={Metrics.unitX3}>
        <Button
          variant="ghost"
          colorScheme="default"
          fillSpace
          title={t('modals.muteNotifications.buttons.no')}
          onPress={() => muteNotifications(true)}
        />
        <Button
          colorScheme="main"
          fillSpace
          title={t('modals.muteNotifications.buttons.yes')}
          onPress={() => muteNotifications(false)}
        />
      </Box>
    </Box>
  );
};

export default MuteNotificationsModal;
