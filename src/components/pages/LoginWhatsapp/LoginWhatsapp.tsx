import {AuthService} from '@/app/api';
import {ILoginWhatsapp} from '@/app/models';
import {Button, Input, Typography} from '@/components/atoms';
import {phoneMask} from '@/utils';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/store/Store';
import {createNotification} from '@/store/slicers';

interface ILoginWhatsappProps {
  onSendCode: (phone: string) => void;
}

const LoginWhatsapp: React.FC<ILoginWhatsappProps> = ({onSendCode}) => {
  const tKey = 'generic.loginWhatsapp';
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [sendingCode, setSendingCode] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<ILoginWhatsapp>({mode: 'all'});

  const handleSendCode = async (formValues: ILoginWhatsapp) => {
    const {phone} = formValues;
    setSendingCode(true);

    try {
      const {data} = await AuthService.sendWhatsappCode(phone);

      if (data.goToVerify) {
        setSendingCode(false);
        onSendCode(phone);
      }
    } catch (error) {
      setSendingCode(false);

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
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleSendCode)}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleSendCode)}
            disabled={!isValid}
            loading={sendingCode}
            title={t('generic.loginWhatsapp.buttons.sendCode')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginWhatsapp;
