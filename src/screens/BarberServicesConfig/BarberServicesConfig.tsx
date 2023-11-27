import React, {useMemo, useState} from 'react';

import {BarbersService} from '@/app/api';
import {IBarberServiceConfig, IBarberServiceDayConfig} from '@/app/models';
import {AppStatusBar, Button, Icons, Typography} from '@/components/atoms';
import {
  Header,
  IBarberServiceGeneralConfig,
  ServiceConfigDaysCard,
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
  ContentBackLinkStyle,
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
    useState<IBarberServiceGeneralConfig | null>(null);
  const [newBusinessDaysConfig, setNewBusinessDaysConfig] =
    useState<IBarberServiceDayConfig | null>(null);
  const [newHolidaysConfig, setNewHolidaysConfig] =
    useState<IBarberServiceDayConfig | null>(null);

  const hasChanges = useMemo(
    () => !!newGeneralConfig || !!newBusinessDaysConfig || !!newHolidaysConfig,
    [newBusinessDaysConfig, newGeneralConfig, newHolidaysConfig],
  );

  const handleGeneralChange = (
    config: IBarberServiceGeneralConfig,
    changed: boolean,
  ) => {
    setNewGeneralConfig(changed ? config : null);
  };

  const handleBusinessDaysChange = (
    config: IBarberServiceDayConfig,
    changed: boolean,
  ) => {
    setNewBusinessDaysConfig(changed ? config : null);
  };

  const handleHolidaysChange = (
    config: IBarberServiceDayConfig,
    changed: boolean,
  ) => {
    setNewHolidaysConfig(changed ? config : null);
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (!barber) {
    return null;
  }

  const handleSaveChanges = async () => {
    if (hasChanges) {
      setUpdating(true);

      try {
        const payload: Partial<IBarberServiceConfig> = {};

        if (newGeneralConfig) {
          payload.workDays = newGeneralConfig.workDays;
          payload.scheduleLimitDays = newGeneralConfig.scheduleLimitDays;
        }

        if (newBusinessDaysConfig) {
          payload.businessDaysConfig = newBusinessDaysConfig;
        }

        if (newHolidaysConfig) {
          payload.holidaysConfig = newHolidaysConfig;
        }

        await BarbersService.updateServiceConfig(payload);

        await dispatch(getCurrentUser());

        setNewGeneralConfig(null);
        setNewBusinessDaysConfig(null);
        setNewHolidaysConfig(null);
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
                message,
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
      <Header showTitle={false} showBorder />
      <ContentStyle>
        <ContentBackLinkStyle onPress={goBack}>
          <Icons.ArrowLeftIcon width={18} color="black1" />
          <Typography variant="button" color="black1">
            {t('barber.servicesConfig.goBack')}
          </Typography>
        </ContentBackLinkStyle>
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
              workDays: barber.workDays,
              scheduleLimitDays: barber.scheduleLimitDays,
            }}
            onChange={handleGeneralChange}
          />
          <ServiceConfigDaysCard
            title="barber.servicesConfig.sections.businessDays.title"
            subtitle="barber.servicesConfig.sections.businessDays.subtitle"
            config={barber.businessDaysConfig}
            onChange={handleBusinessDaysChange}
          />
          <ServiceConfigDaysCard
            title="barber.servicesConfig.sections.holidays.title"
            subtitle="barber.servicesConfig.sections.holidays.subtitle"
            config={barber.holidaysConfig}
            onChange={handleHolidaysChange}
          />
        </ScrollContentStyle>
        <Button
          disabled={!hasChanges}
          title={t('barber.servicesConfig.buttons.save')}
          onPress={handleSaveChanges}
          loading={updating}
        />
      </ContentStyle>
    </ContainerStyles>
  );
};

export default BarberServicesConfig;
