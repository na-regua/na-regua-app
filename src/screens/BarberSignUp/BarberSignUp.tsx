import React from 'react';

import {Header} from '@/components/molecules';
import {SignUpForm} from '@/components/pages';

import {AppStatusBar} from '@/components/atoms';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ContainerStyle,
  ContentStyle,
  ScrollContentStyle,
  styles,
} from './styles';

const BarberSignUp: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleNavigateToLogin = () => {
    navigation.navigate(APP_ROUTES.GENERIC_LOGIN);
  };

  return (
    <ContainerStyle style={[insetsStyles]}>
      <AppStatusBar />
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={18}
        style={styles.keyboardAvoid}>
        <ScrollContentStyle contentContainerStyle={styles.scrollContainer}>
          <Header
            showTitle
            title={t('barber.signUp.title')}
            subtitle={t('barber.signUp.subtitle')}
            onIconPress={handleNavigateToLogin}
            clickable
          />
          <ContentStyle>
            <SignUpForm />
          </ContentStyle>
        </ScrollContentStyle>
      </KeyboardAvoidingView>
    </ContainerStyle>
  );
};

export default BarberSignUp;
