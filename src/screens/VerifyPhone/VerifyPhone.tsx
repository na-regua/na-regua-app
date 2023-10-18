import {AuthService} from '@/app/api';
import {Button, CodeInput, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {setPersistedToken} from '@/store/slicers';
import {Colors} from '@/theme';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const VerifyPhone: React.FC = () => {
  const barber = useSelector((state: RootState) => state.auth.barber);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const [code, setCode] = useState('');
  const [expired, setExpired] = useState(false);
  const [timer, setTimer] = useState(60);

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
    if (!barber) {
      return;
    }

    const {phone} = barber.user;

    try {
      const data = await AuthService.sendWhatsappCode(phone);

      if (data) {
        setTimer(60);
        setExpired(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  const handleVerifyPhone = async () => {
    if (!barber) {
      return;
    }

    const {phone} = barber.user;

    try {
      const {data} = await AuthService.verifyWhatsapp(code, phone);

      if (data.accessToken) {
        dispatch(setPersistedToken(data.accessToken));

        if (data.barber) {
        }
        navigation.navigate('BarberPreSignUp');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <View style={[styles.container, insetsStyles]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
      <Header
        showTitle
        title={t('generic.verifyPhone.title')}
        subtitle={t('generic.verifyPhone.subtitle')}
      />
      <View style={styles.content}>
        <View style={styles.validationContainer}>
          <CodeInput
            digits={digits}
            onCodeChange={text => {
              setCode(text);
            }}
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
        />
      </View>
    </View>
  );
};

export default VerifyPhone;
