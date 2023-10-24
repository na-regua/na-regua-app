import {AuthService} from '@/app/api';
import {Button, CodeInput, Typography} from '@/components/atoms';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  createNotification,
  setBarber,
  setPersistedToken,
  setUser,
} from '@/store/slicers';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

interface ILoginVerifyProps {
  phone: string;
}

const LoginVerifyCode: React.FC<ILoginVerifyProps> = ({phone}) => {
  const digits = 6;

  const {t} = useTranslation();
  const navigator = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const skipPreSignUp = useSelector((state: RootState) => state.config.skipPre);

  const tKey = 'generic.loginVerify';

  const [code, setCode] = useState('');
  const [expired, setExpired] = useState(false);
  const [timer, setTimer] = useState(0);

  const [verifyingCode, setVerifyingCode] = useState(false);

  const handleSendAgain = async () => {
    try {
      const data = await AuthService.sendWhatsappCode(phone);

      if (data) {
        setTimer(60);
        setExpired(false);
      }
    } catch (error) {
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

  const handleVerifyCode = async () => {
    try {
      setVerifyingCode(true);

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

      setVerifyingCode(false);
    } catch (error) {
      setVerifyingCode(false);

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.content}>
        <View style={styles.headerWrapper}>
          <Typography variant="h4" color="white3">
            {t(`${tKey}.title`)}
          </Typography>
          <Typography
            variant="body1"
            color="white3"
            style={styles.headerSubtitle}>
            {t(`${tKey}.subtitle`)}
          </Typography>
        </View>
        <View style={styles.card}>
          <CodeInput
            digits={digits}
            onCodeChange={setCode}
            onDone={() => code.length === digits && handleVerifyCode()}
          />

          {!expired && (
            <View style={styles.sendAgainWrapper}>
              <Typography variant="button" color="placeholder">
                0:{timer + 1 > 10 ? timer : `0${timer}`}
              </Typography>
            </View>
          )}
          {expired && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSendAgain}
              style={styles.sendAgainWrapper}>
              <Typography variant="button" color="primary">
                {t('generic.loginVerify.sendAgain')}
              </Typography>
            </TouchableOpacity>
          )}

          <Button
            onPress={handleVerifyCode}
            disabled={!code || code.length !== digits}
            loading={verifyingCode}
            title={t('generic.loginVerify.buttons.login')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginVerifyCode;
