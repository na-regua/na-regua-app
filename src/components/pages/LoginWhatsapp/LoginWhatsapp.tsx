import {Button, CodeInput, Input, Typography} from '@/components/atoms';
import {AuthService} from '@/app/api';
import {ILoginWhatsapp} from '@/app/models';
import {phoneMask} from '@/utils';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface ILoginWhatsappProps {}

const LoginWhatsapp: React.FC<ILoginWhatsappProps> = ({}) => {
  const digits = 6;

  const {t} = useTranslation();
  const [tKey, setTKey] = useState('generic.loginWhatsapp');

  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState('');
  const [expired, setExpired] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    control,
    handleSubmit,
    formState: {isValid},
    getValues,
  } = useForm<ILoginWhatsapp>({mode: 'all'});

  const handleSendCode = async (formValues: ILoginWhatsapp) => {
    const {phone} = formValues;

    try {
      const {data} = await AuthService.sendWhatsappCode(phone);

      if (data.goToVerify) {
        setVerify(true);
        setTKey('generic.loginVerify');
        setTimer(60);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        console.log(error.response);
      }
    }
  };

  const handleSendAgain = async () => {
    const {phone} = getValues();

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
    const {phone} = getValues();

    try {
      const {data} = await AuthService.verifyWhatsapp(code, phone);

      if (data.accessToken) {
        console.log(data.accessToken);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
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
        {!verify && (
          <>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label={t('generic.loginWhatsapp.fields.phone')}
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  onChangeText={text => {
                    const maskedValue = phoneMask(text);
                    onChange(maskedValue);
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

            <Button
              onPress={handleSubmit(handleSendCode)}
              disabled={!isValid}
              title={t('generic.loginWhatsapp.buttons.sendCode')}
            />
          </>
        )}
        {verify && (
          <>
            <CodeInput digits={digits} onCodeChange={setCode} />

            <Button
              onPress={handleVerifyPhone}
              disabled={!code || code.length === 0}
              title={t('generic.loginVerify.buttons.login')}
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
          </>
        )}
      </View>
    </View>
  );
};

export default LoginWhatsapp;
