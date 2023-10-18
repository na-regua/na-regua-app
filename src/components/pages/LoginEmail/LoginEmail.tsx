import {Button, Icons, Input, Typography} from '@/components/atoms';
import {AuthService} from '@/app/api';
import {ILoginEmail, TLoginSteps} from '@/app/models';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {ACCESS_TOKEN_KEY, setPersistedToken} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

interface ILoginEmailProps {
  onLoginMethod: (method: TLoginSteps) => void;
}

const LoginEmail: React.FC<ILoginEmailProps> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useAppNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const {control, handleSubmit, formState} = useForm<ILoginEmail>({
    mode: 'all',
  });

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleOnSubmit = async (formValues: ILoginEmail) => {
    const {email, password} = formValues;

    try {
      const {data} = await AuthService.loginWithEmail({email, password});

      if (data) {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);

        dispatch(setPersistedToken(data.accessToken));

        navigator.navigate(APP_ROUTES.BARBER_QUEUE);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        console.log(error.response);
      }
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.headerWrapper}>
        <Typography variant="h4" color="white3">
          {t('generic.loginEmail.title')}
        </Typography>
        <Typography
          variant="body1"
          color="white3"
          style={styles.headerSubtitle}>
          {t('generic.loginEmail.subtitle')}
        </Typography>
      </View>
      <View style={styles.card}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('generic.loginEmail.fields.email')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('generic.loginEmail.fields.password')}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              suffix={
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleShowPassword}>
                  <Icons.EyeIcon
                    width={20}
                    height={20}
                    closed={showPassword}
                    color="default"
                  />
                </TouchableOpacity>
              }
            />
          )}
        />
        <Button
          onPress={handleSubmit(handleOnSubmit)}
          disabled={!formState.isValid}
          title={t('generic.loginEmail.buttons.login')}
        />
      </View>
    </View>
  );
};

export default LoginEmail;
