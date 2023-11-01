import React, {useState} from 'react';

import {
  Button,
  Icons,
  SelectScheduleLimit,
  SelectWorkDays,
  Typography,
} from '@/components/atoms';
import {Header, ServiceConfigDaysCard} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {getCurrentUser} from '@/store/slicers';
import {Colors} from '@/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfigCardStyle,
  ContainerStyles,
  ContentBackLinkStyle,
  ContentHeaderStyle,
  ContentStyle,
  GroupConfigStyle,
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

  const [workDaysChanged, setWorkDaysChanged] = useState<boolean>(false);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleChangeWorkDays = () => {
    setWorkDaysChanged(true);
  };

  if (!barber) {
    return null;
  }

  return (
    <ContainerStyles style={insetsStyles}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
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
          <Typography variant="body1" color="black1">
            {t('barber.servicesConfig.subtitle')}
          </Typography>
        </ContentHeaderStyle>
        <ScrollContentStyle
          contentContainerStyle={styles.scrollContentContainer}>
          <GroupConfigStyle>
            <Typography variant="body1" color="black2">
              {t('barber.servicesConfig.sections.general.title')}
            </Typography>
            <ConfigCardStyle>
              <SelectWorkDays
                initialWorkDays={barber.workDays}
                onChanged={handleChangeWorkDays}
              />
              <SelectScheduleLimit
                initialLimit={barber.scheduleLimitDays}
                onChanged={() => {}}
              />
            </ConfigCardStyle>
          </GroupConfigStyle>
          <GroupConfigStyle>
            <Typography variant="body1" color="black2">
              {t('barber.servicesConfig.sections.businessDays.title')}
            </Typography>
            <ServiceConfigDaysCard
              config={barber.businessDaysConfig}
              onChange={config => {
                console.log(config);
              }}
            />
          </GroupConfigStyle>
          <GroupConfigStyle>
            <Typography variant="body1" color="black2">
              {t('barber.servicesConfig.sections.holidays.title')}
            </Typography>
            <ServiceConfigDaysCard
              config={barber.holidaysConfig}
              onChange={config => {
                console.log(config);
              }}
            />
          </GroupConfigStyle>
        </ScrollContentStyle>
        <Button title={t('barber.servicesConfig.buttons.save')} />
      </ContentStyle>
    </ContainerStyles>
  );
};

export default BarberServicesConfig;
