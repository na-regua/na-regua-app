import {AuthService} from '@/app/api';
import {ILoginPhone} from '@/app/models';
import {Button, CodeInput, Icons, Input, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  createNotification,
  setBarber,
  setCurrentPhone,
  setLoginMethod,
  setPersistedToken,
  setUser,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {phoneMask, phoneRegex} from '@/utils';
import {AxiosError} from 'axios';
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
  const {method, currentPhone} = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useAppNavigation();

  const [code, setCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const fieldsRef = {
    phone: useRef<TextInput>(null),
  };

  const setLoginMailMethod = () => {
    dispatch(setLoginMethod('e-mail'));
  };

  const sendCode = async () => {
    try {
      setIsSending(true);

      const {phone} = getValues();

      const {data} = await AuthService.sendOTPCode(phone);

      if (data.goToVerify) {
        dispatch(setCurrentPhone(phone));
        dispatch(setLoginMethod('verify-code'));

        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);
      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'send-whatsapp-code-error',
              type: 'error',
              message,
            }),
          );
        }
      }
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

        dispatch(setLoginMethod('phone'));

        return;
      }

      setIsVerifying(true);

      const {data} = await AuthService.verifyOTPCode(code, currentPhone);

      if (data) {
        const {accessToken} = data;

        await dispatch(setPersistedToken(accessToken));

        if (data.barber) {
          dispatch(setUser(data.user));
          dispatch(setBarber(data.barber));

          navigator.navigate('/barber/queue');
        }

        setIsVerifying(false);
      }
    } catch (error) {
      setIsVerifying(false);

      if (error instanceof AxiosError) {
        if (error.response?.data && error.response?.data.message) {
          const {message} = error.response?.data;
          if (message) {
            dispatch(
              createNotification({
                id: 'send-whatsapp-code-error',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  const backToPhone = () => {
    dispatch(setLoginMethod('phone'));
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <ContentStyle>
      <LogoContainerStyle>
        <Icons.LogoMiniIcon
          svgStyle={{borderRadius: 18, overflow: 'hidden'}}
          disabled
          width={80}
          height={80}
        />
        <Icons.LogoWritingIcon width={220} height={50} />
      </LogoContainerStyle>

      {method === 'phone' && (
        <>
          <Typography
            variant="body1"
            color="black1"
            children="generic.login.barber.phoneSubtitle"
            textAlign="justify"
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
      {method === 'verify-code' && (
        <>
          <Typography
            variant="body1"
            color="black1"
            children="generic.login.barber.verifySubtitle"
            textAlign="justify"
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
