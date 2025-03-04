import {AuthService} from '@/app/api';
import {ILoginEmail, SystemErrors, UserRoles} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {
  AuthThunks,
  createNotification,
  setBarber,
  setUser,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {CacheManager} from '@georstat/react-native-image-cache';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {ContentStyle, LogoContainerStyle} from './styles';

export interface IBarberLoginMailFormProps {}

const BarberLoginMailForm: React.FC<IBarberLoginMailFormProps> = () => {
  const {
    control,
    formState: {isValid},
    getValues,
    reset,
  } = useForm<ILoginEmail>({mode: 'all'});
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useAppNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fieldsRef = {
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
  };

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const doLogin = async () => {
    try {
      setIsSending(true);
      const {email, password} = getValues();

      const {data} = await AuthService.loginWithEmail({email, password});

      const {user, barber, access_token} = data;

      if (user) {
        if (user.role === UserRoles.Customer) {
          setIsSending(false);
          dispatch(
            createNotification({
              id: 'login-email',
              type: 'error',
              message: `errors.${SystemErrors.INVALID_USER}`,
            }),
          );

          return;
        }

        await dispatch(AuthThunks.setPersistedToken(access_token));

        if (barber) {
          if (user.avatar.url) {
            CacheManager.prefetch(user.avatar.url);
          }

          if (barber.avatar.url) {
            CacheManager.prefetch(barber.avatar.url);
          }

          dispatch(setUser(user));
          dispatch(setBarber(barber));
          setIsSending(false);

          if (barber.profile_status === 'pre') {
            navigator.navigate('/barber/settings/workers', {
              showContinue: true,
            });
          }

          if (barber.profile_status === 'completed') {
            navigator.navigate('/barber/queue');
          }

          reset();
        }
      }
    } catch (error) {
      setIsSending(false);
    }
  };

  return (
    <ContentStyle>
      <LogoContainerStyle>
        <Icons.LogoMiniIcon disabled width={80} height={80} />
        <Icons.LogoWritingIcon width={220} height={50} />
      </LogoContainerStyle>
      <Typography
        variant="body1"
        color="black1"
        children="generic.login.barber.mailSubtitle"
        textAlign="justify"
      />

      <Controller
        name="email"
        control={control}
        rules={{required: true}}
        render={({field: {onChange}}) => (
          <Input
            label="generic.login.barber.fields.email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => {
              onChange(text);
            }}
            inputRef={fieldsRef.email}
            returnKeyType="next"
            onSubmitEditing={() => fieldsRef.password.current?.focus()}
            blurOnSubmit={false}
            textContentType="emailAddress"
            textStyle={{borderColor: Colors.primary}}
          />
        )}
      />

      <Controller
        name="password"
        rules={{required: true, minLength: 5}}
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            label="generic.login.barber.fields.password"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            autoCapitalize="none"
            value={value}
            suffix={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleShowPassword}>
                <Typography variant="button" color="primary">
                  {showPassword ? 'generic.login.hide' : 'generic.login.show'}
                </Typography>
              </TouchableOpacity>
            }
            inputRef={fieldsRef.password}
            returnKeyType="done"
            onSubmitEditing={() => isValid && doLogin()}
            blurOnSubmit={true}
            textStyle={{borderColor: Colors.primary}}
          />
        )}
      />
      <Button
        title="generic.login.barber.buttons.join"
        disabled={!isValid}
        onPress={doLogin}
        loading={isSending}
      />
      {/* Changing to only email and password */}
      {/* <Icons.LinesIcon /> */}
      {/* <Button
        variant="ghost"
        colorScheme="primary"
        title="generic.login.barber.buttons.phoneLogin"
        onPress={setPhoneLoginMethod}
      /> */}
    </ContentStyle>
  );
};

export {BarberLoginMailForm};
