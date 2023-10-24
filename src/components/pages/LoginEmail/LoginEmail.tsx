import {AuthService} from '@/app/api';
import {ILoginEmail, TLoginSteps} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  createNotification,
  setBarber,
  setPersistedToken,
  setUser,
} from '@/store/slicers';
import {AxiosError} from 'axios';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

interface ILoginEmailProps {
  onLoginMethod: (method: TLoginSteps) => void;
}

const LoginEmail: React.FC<ILoginEmailProps> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useAppNavigation();
  const skipPreSignUp = useSelector((state: RootState) => state.config.skipPre);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const {control, handleSubmit, formState} = useForm<ILoginEmail>({
    mode: 'all',
  });

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleOnSubmit = async (formValues: ILoginEmail) => {
    Keyboard.dismiss();
    const {email, password} = formValues;

    setLoading(true);

    try {
      const {data} = await AuthService.loginWithEmail({email, password});

      setLoading(false);

      if (data) {
        await dispatch(setPersistedToken(data.accessToken));

        if (data.user && data.barber) {
          dispatch(setBarber(data.barber));
          dispatch(setUser(data.user));

          if (data.barber.profileStatus === 'pre' && !skipPreSignUp) {
            navigator.navigate(APP_ROUTES.BARBER_PRE_SIGN_UP);
          } else {
            navigator.navigate(APP_ROUTES.BARBER_QUEUE);
          }
        }
      }
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'login-email',
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
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
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
                inputRef={passwordRef}
                label={t('generic.loginEmail.fields.password')}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleOnSubmit)}
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
            loading={loading}
            title={t('generic.loginEmail.buttons.login')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginEmail;
