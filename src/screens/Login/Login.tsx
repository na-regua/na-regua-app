import {Icons, Typography} from '@/components/atoms';
import {LoginEmail, LoginWelcome} from '@/components/pages';
import LoginWhatsapp from '@/components/pages/LoginWhatsapp/LoginWhatsapp';
import {TLoginSteps} from '@/core/models';
import {Colors, Metrics} from '@/theme';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';

const Login: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const [loginMethod, setLoginMethod] = useState<TLoginSteps>('welcome');

  const getSplashHeight = useMemo(
    () =>
      loginMethod === 'welcome'
        ? Metrics.screenHeight * 0.44
        : Metrics.screenHeight * 0.38,
    [loginMethod],
  );

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleOnLoginMethod = (method: TLoginSteps) => {
    setLoginMethod(method);
  };

  return (
    <View style={[styles.container, insetsStyles]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <View style={[styles.splash, {height: getSplashHeight}]} />
      {loginMethod === 'welcome' && (
        <LoginWelcome onLoginMethod={handleOnLoginMethod} />
      )}
      {loginMethod !== 'welcome' && (
        <View style={styles.content}>
          <View style={styles.logoHeaderWrapper}>
            <View style={styles.logoHeader} />
            <Typography variant="body2" color="white3">
              Na Régua
            </Typography>
          </View>
          <TouchableOpacity
            style={styles.backLink}
            activeOpacity={0.8}
            onPress={() => handleOnLoginMethod('welcome')}>
            <Icons.ArrowLeftIcon width={18} color="white3" />
            <Typography variant="button" color="white3">
              {t('generic.login.backLink')}
            </Typography>
          </TouchableOpacity>
          {loginMethod === 'e-mail' && (
            <LoginEmail onLoginMethod={handleOnLoginMethod} />
          )}
          {loginMethod === 'whatsapp' && <LoginWhatsapp />}
        </View>
      )}
    </View>
  );
};

export default Login;
