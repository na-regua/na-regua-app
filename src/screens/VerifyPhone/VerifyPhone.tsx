import {AuthService} from '@/app/api';
import {Button, CodeInput, Loader, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  createNotification,
  setBarber,
  setPersistedToken,
  setUser,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const VerifyPhone: React.FC = () => {
  const {barber, user} = useSelector((state: RootState) => state.auth);
  const skipPreSignUp = useSelector((state: RootState) => state.config.skipPre);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigator = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const [code, setCode] = useState('');
  const [expired, setExpired] = useState(false);
  const [timer, setTimer] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const [sendingAgain, setSendingAgain] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if (timer === 0) {
      setExpired(true);
      setTimer(0);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const digits = 6;

  const handleSendAgain = async () => {
    if (!barber || !user || sendingAgain) {
      return;
    }

    setSendingAgain(true);

    const {phone} = user;

    try {
      const data = await AuthService.sendWhatsappCode(phone);

      if (data) {
        setTimer(60);
        setExpired(false);
      }

      setSendingAgain(false);
    } catch (error) {
      setSendingAgain(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'send-whatsapp',
              type: 'error',
              message,
            }),
          );
        }
      }
    }
  };

  const handleVerifyPhone = async () => {
    if (!barber || !user || verifying) {
      return;
    }

    setVerifying(true);

    const {phone} = user;

    try {
      const {data} = await AuthService.verifyWhatsapp(code, phone);

      if (data) {
        await dispatch(setPersistedToken(data.accessToken));

        if (data.barber) {
          dispatch(setUser(data.user));
          dispatch(setBarber(data.barber));

          if (data.barber.profileStatus === 'pre' && !skipPreSignUp) {
            navigator.navigate(APP_ROUTES.BARBER_PRE_SIGN_UP);
          } else {
            navigator.navigate(APP_ROUTES.BARBER_QUEUE);
          }
        }
      }

      setVerifying(false);
    } catch (error) {
      setVerifying(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'verify-whatsapp',
              type: 'error',
              message,
            }),
          );
        }
      }
    }
  };

  const handleNavigateToLogin = () => {
    navigator.navigate(APP_ROUTES.GENERIC_LOGIN);
  };

  return (
    <View style={[styles.container, insetsStyles]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
      <Header
        showTitle
        title={t('generic.verifyPhone.title')}
        subtitle={t('generic.verifyPhone.subtitle')}
        onIconPress={handleNavigateToLogin}
        clickable
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.content}>
          <View style={styles.validationContainer}>
            <CodeInput
              digits={digits}
              onCodeChange={text => {
                setCode(text);
              }}
              onDone={() => code.length === digits && handleVerifyPhone()}
            />
            {sendingAgain && <Loader color={Colors.primary} />}
            {!expired && !sendingAgain && (
              <View style={styles.sendAgainWrapper}>
                <Typography variant="button" color="placeholder">
                  0:{timer + 1 > 10 ? timer : `0${timer}`}
                </Typography>
              </View>
            )}
            {expired && !sendingAgain && (
              <TouchableOpacity
                style={styles.sendAgainWrapper}
                onPress={handleSendAgain}
                activeOpacity={0.6}>
                <Typography variant="button" color="primary">
                  {t('generic.verifyPhone.sendAgain')}
                </Typography>
              </TouchableOpacity>
            )}
          </View>
          <Button
            onPress={handleVerifyPhone}
            disabled={code.length !== digits}
            title={t('generic.verifyPhone.buttons.send')}
            style={styles.button}
            loading={verifying}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VerifyPhone;
