import React, {useMemo, useState} from 'react';

import {BarbersService} from '@/app/api';
import {IBarberServiceConfig} from '@/app/models';
import {AppStatusBar, Button, Typography} from '@/components/atoms';
import {
  Header,
  IBarberServiceGeneralConfig,
  ServiceGeneralConfigCard,
} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {createNotification, getCurrentUser} from '@/store/slicers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  ContainerStyles,
  ContentHeaderStyle,
  ContentStyle,
  ScrollContentStyle,
  styles,
} from './style';

const BarberServicesConfig: React.FC<
  NativeStackScreenProps<
    TRootStackParamList,
    '/barber/settings/services/config'
  >
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const {barber} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [updating, setUpdating] = useState(false);
  const [newGeneralConfig, setNewGeneralConfig] =
    useState<Partial<IBarberServiceGeneralConfig> | null>(null);

  const hasChanges = useMemo(() => {
    return Object.keys(newGeneralConfig || {}).length > 0;
  }, [newGeneralConfig]);

  const handleGeneralChange = (
    config: Partial<IBarberServiceGeneralConfig>,
  ) => {
    setNewGeneralConfig(config);
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/barber/settings');
    }
  };

  if (!barber) {
    return null;
  }

  const handleSaveChanges = async () => {
    if (hasChanges) {
      setUpdating(true);

      try {
        const payload: Partial<IBarberServiceConfig> = {
          ...newGeneralConfig,
        };

        await BarbersService.update({
          servicesConfig: payload,
        });

        await dispatch(getCurrentUser());

        setNewGeneralConfig(null);
        setUpdating(false);
      } catch (error) {
        setUpdating(false);

        if (error instanceof AxiosError) {
          const {message} = error.response?.data;

          if (message) {
            dispatch(
              createNotification({
                id: 'service-update',
                type: 'error',
                message: `error.${message}`,
              }),
            );
          }
        }
      }
    }
  };

  return (
    <ContainerStyles style={insetsStyles}>
      <AppStatusBar />
      <Header
        showTitle={false}
        showBack
        showActions={false}
        showBorder
        onBackPress={goBack}
      />
      <ContentStyle>
        <ContentHeaderStyle>
          <Typography variant="h5" color="black3">
            {t('barber.servicesConfig.title')}
          </Typography>
          <Typography variant="body2" color="black1">
            {t('barber.servicesConfig.subtitle')}
          </Typography>
        </ContentHeaderStyle>
        <ScrollContentStyle
          contentContainerStyle={styles.scrollContentContainer}>
          <ServiceGeneralConfigCard
            config={{
              workDays: barber.config.workDays,
              scheduleLimitDays: barber.config.scheduleLimitDays,
              openBarberAuto: barber.config.openBarberAuto,
              openQueueAuto: barber.config.openQueueAuto,
            }}
            onChange={handleGeneralChange}
          />
        </ScrollContentStyle>
        <Button
          disabled={!hasChanges}
          colorScheme="primary"
          title={t('barber.servicesConfig.buttons.save')}
          onPress={handleSaveChanges}
          loading={updating}
        />
      </ContentStyle>
    </ContainerStyles>
  );
};

export default BarberServicesConfig;
