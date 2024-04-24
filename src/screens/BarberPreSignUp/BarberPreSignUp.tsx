import {AppStatusBar, Button} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActionsStyle, ContainerStyle, ContentStyle} from './styles';

const BarberPreSignUp: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleSkipPreSignUp = async () => {
    try {
      navigation.navigate(APP_ROUTES.BARBER_QUEUE);
    } catch (error) {}
  };

  const navigateToWorkers = () => {
    // navigation.navigate();
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />

      <Header
        title={t('barber.preSignUp.title')}
        subtitle={t('barber.preSignUp.subtitle')}
      />
      <ContentStyle>
        <ActionsStyle>
          <Button
            variant="outlined"
            title={t('barber.preSignUp.buttons.later')}
            onPress={handleSkipPreSignUp}
          />
          <Button
            onPress={navigateToWorkers}
            title={t('barber.preSignUp.buttons.now')}
          />
        </ActionsStyle>
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberPreSignUp;
