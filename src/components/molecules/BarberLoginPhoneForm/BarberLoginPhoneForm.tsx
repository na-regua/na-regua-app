import {AuthService} from '@/app/api';
import {ILoginPhone} from '@/app/models';
import {Button, CodeInput, Icons, Input, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  AuthThunks,
  createNotification,
  setBarber,
  setBarberMethod,
  setCurrentPhone,
  setUser,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {phoneMask, phoneRegex} from '@/utils';
import {CacheManager} from '@georstat/react-native-image-cache';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ContentStyle, LogoContainerStyle} from './styles';

const BarberLoginPhoneForm = () => {
  const {
    control,
    formState: {isValid},
    getValues,
    reset,
  } = useForm<ILoginPhone>({mode: 'all'});
  const {barberMethod, currentPhone} = useSelector(
    (state: RootState) => state.login,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useAppNavigation();

  const [code, setCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const fieldsRef = {
    phone: useRef<TextInput>(null),
  };

  const setLoginMailMethod = () => {
    dispatch(setBarberMethod('e-mail'));
  };

  const sendCode = async () => {
    try {
      setIsSending(true);

      const {phone} = getValues();

      const {data} = await AuthService.sendOTPCode(phone);

      if (data.goToVerify) {
        dispatch(setCurrentPhone(phone));
        dispatch(setBarberMethod('verify-code'));

        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);
    }
  };

  const verifyCode = async () => {
    try {
      if (!currentPhone) {
        dispatch(
          createNotification({
            id: 'no-phone-error',
            type: 'error',
            message: 'NO_PHONE',
          }),
        );

        dispatch(setBarberMethod('phone'));

        return;
      }

      setIsVerifying(true);

      const {data} = await AuthService.verifyOTPCode(code, currentPhone);

      if (data) {
        const {access_token} = data;

        await dispatch(AuthThunks.setPersistedToken(access_token));

        if (data.user.avatar.url) {
          CacheManager.prefetch(data.user.avatar.url);
        }

        if (data.barber.avatar.url) {
          CacheManager.prefetch(data.barber.avatar.url);
        }

        if (data.barber) {
          dispatch(setUser(data.user));
          dispatch(setBarber(data.barber));

          navigator.navigate('/barber/queue');
        }

        setIsVerifying(false);
      }
    } catch (error) {
      setIsVerifying(false);
    }
  };

  const backToPhone = () => {
    dispatch(setBarberMethod('phone'));
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <ContentStyle>
      <LogoContainerStyle>
        <Icons.LogoMiniIcon disabled width={80} height={80} />
        <Icons.LogoWritingIcon width={220} height={50} />
      </LogoContainerStyle>

      {barberMethod === 'phone' && (
        <>
          <Typography
            variant="body1"
            color="black1"
            children="generic.login.barber.phoneSubtitle"
          />
          <Controller
            name="phone"
            rules={{required: true, pattern: phoneRegex}}
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                label="generic.login.customer.fields.phone"
                autoCapitalize="none"
                onChangeText={text => {
                  const maskedValue = phoneMask(text);
                  onChange(maskedValue);
                }}
                value={value}
                inputRef={fieldsRef.phone}
                // returnKeyType="done"
                // onSubmitEditing={() => {}}
                blurOnSubmit={true}
                keyboardType="number-pad"
                textContentType="telephoneNumber"
                textStyle={{borderColor: Colors.primary}}
              />
            )}
          />

          <Button
            title="generic.login.barber.buttons.send"
            disabled={!isValid}
            onPress={sendCode}
            loading={isSending}
          />
        </>
      )}
      {barberMethod === 'verify-code' && (
        <>
          <Typography
            variant="body1"
            color="black1"
            children="generic.login.barber.verifySubtitle"
          />
          <CodeInput
            digits={6}
            onCodeChange={text => {
              setCode(text);
            }}
          />
          <Button
            variant="text"
            colorScheme="primary"
            title="generic.login.barber.again"
          />
          <Button
            title="generic.login.barber.buttons.send"
            disabled={code.length < 6}
            onPress={verifyCode}
            loading={isVerifying}
          />
          <Button
            title="generic.login.barber.buttons.back"
            variant="ghost"
            onPress={backToPhone}
          />
        </>
      )}
      <Icons.LinesIcon />
      <Button
        variant="ghost"
        colorScheme="primary"
        title="generic.login.barber.buttons.mailLogin"
        onPress={setLoginMailMethod}
      />
    </ContentStyle>
  );
};

export {BarberLoginPhoneForm};
