import {Button, CodeInput, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {AuthService} from '@/core/api';
import {RootState} from '@/store/Store';
import {Colors, Metrics} from '@/theme';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const VerifyPhone: React.FC = () => {
  const barber = useSelector((state: RootState) => state.barber.barber);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

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

        console.log(data);
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
      const data = await AuthService.verifyWhatsapp(code, phone);

      if (data) {
        console.log(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <View style={[styles.container, insetsStyles]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <View style={styles.content}>
        <Header
          showTitle
          title={t('generic.verifyPhone.title')}
          subtitle={t('generic.verifyPhone.subtitle')}
        />
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
          <Typography variant="body1">
            {(barber && barber.user.phone) || 'no phone'}
          </Typography>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgLight,
  },
  content: {
    flex: 1,
    width: Metrics.screenWidth,
    padding: Metrics.smPadding,
    flexDirection: 'column',
    gap: 18,
  },
  sendAgainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  validationContainer: {
    flex: 1,
    gap: 18,
  },
});

export default VerifyPhone;
