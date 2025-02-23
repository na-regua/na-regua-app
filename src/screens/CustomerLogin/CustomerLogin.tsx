import {AuthService} from '@/app/api';
import {ILoginEmail} from '@/app/models';
import {Button, CodeInput, Icons, Input, Typography} from '@/components/atoms';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  TUserType,
  createNotification,
  setCustomerMethod,
  setLoginUserType,
  setPersistedToken,
  setUser,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {CacheManager} from '@georstat/react-native-image-cache';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {intervalToDuration} from 'date-fns';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {SwitchButton, SwitchButtonStyle} from '../Login/styles';
import {
  ContainerStyle,
  ContentFormStyle,
  ContentStyle,
  FooterContainerStyle,
  LogoContainerStyle,
  customerLoginStyles,
} from './styles';

const CustomerLogin: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/generic/login/customer'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {userType, customerMethod} = useSelector(
    (state: RootState) => state.login,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isSending, setIsSending] = useState(false);
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [timer, setTimer] = useState(5);
  const [sended, setSended] = useState(false);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const timerStr = useMemo(() => {
    if (timer > 0) {
      const {seconds, minutes} = intervalToDuration({
        start: 0,
        end: timer * 1000,
      });

      return `${minutes}:${seconds?.toString().padStart(2, '0')}`;
    }

    return '0';
  }, [timer]);

  const {
    control,
    formState: {isValid},
    getValues,
    reset: resetForm,
  } = useForm<ILoginEmail>({mode: 'all'});

  const fieldsRef = {
    phone: useRef<TextInput>(null),
  };

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleSwitchUserType = (type: TUserType) => {
    dispatch(setLoginUserType(type));

    if (type === 'worker') {
      navigation.navigate('/generic/login/barber');
    }

    if (type === 'customer') {
      navigation.navigate('/generic/login/customer');
    }
  };

  const reset = () => {
    dispatch(setCustomerMethod('e-mail'));
    setCode('');
    clearTimer();
    resetForm();
  };

  // Timer FN
  useEffect(() => {
    if (sended) {
      const interval = setTimeout(() => {
        setTimerId(interval);

        if (timer === 0) {
          clearTimer();
        }

        if (timer > 0) {
          setTimer(timer - 1);
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sended, timer]);

  const initTimer = () => {
    setTimer(60);
    setTimerId(null);
    setSended(true);
  };

  const clearTimer = () => {
    if (timerId) {
      setSended(false);
      setTimerId(null);
      clearTimeout(timerId);
    }
  };

  const goToSignUp = () => {
    navigation.navigate('/customer/sign-up');
  };

  const sendCode = async () => {
    try {
      setIsSending(true);

      const {email} = getValues();

      const {data} = await AuthService.sendEmailCode(email);

      if (data.goToVerify) {
        setIsSending(false);

        dispatch(setCustomerMethod('verify-code'));

        initTimer();
      }
    } catch (error) {
      setIsSending(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;
        if (message) {
          dispatch(
            createNotification({
              id: 'customer-login',
              message: `erro.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  const sendAgain = async () => {
    try {
      const {email} = getValues();

      await AuthService.sendEmailCode(email);

      initTimer();
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error.response?.data;
        if (message) {
          dispatch(
            createNotification({
              id: 'customer-login',
              message: `erro.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  const verifyCode = async () => {
    try {
      setIsVerifying(true);
      const {email} = getValues();
      const {data} = await AuthService.verifyEmailCode(code, email);

      if (data) {
        const {access_token} = data;

        await dispatch(setPersistedToken(access_token));

        if (data.user) {
          if (data.user.avatar.url) {
            CacheManager.prefetch(data.user.avatar.url);
          }

          dispatch(setUser(data.user));

          navigation.navigate('/customer/home');
        }
      }

      setIsVerifying(false);

      reset();
    } catch (error) {
      setIsVerifying(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;
        if (message) {
          dispatch(
            createNotification({
              id: 'customer-verify',
              message: `erro.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  const useAnotherPhone = () => {
    dispatch(setCustomerMethod('e-mail'));
  };

  return (
    <TouchableWithoutFeedback
      style={customerLoginStyles.flex1}
      onPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      }}>
      <ContainerStyle contentContainerStyle={[insetsStyles]}>
        <ContentStyle>
          <ContentFormStyle>
            <LogoContainerStyle>
              <Icons.LogoMiniIcon disabled width={80} height={80} />
              <Icons.LogoWritingIcon width={220} height={50} />
            </LogoContainerStyle>

            {customerMethod === 'e-mail' && (
              <>
                <Typography
                  variant="body1"
                  color="black1"
                  children="generic.login.customer.mailSubtitle"
                  textAlign="justify"
                />

                <Controller
                  name="email"
                  rules={{required: true}}
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label="generic.login.customer.fields.mail"
                      autoCapitalize="none"
                      onChangeText={text => {
                        onChange(text);
                      }}
                      value={value}
                      inputRef={fieldsRef.phone}
                      returnKeyType={(isValid && 'done') || 'none'}
                      onSubmitEditing={() => {}}
                      blurOnSubmit={true}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      textStyle={{borderColor: Colors.primary}}
                    />
                  )}
                />

                {/* <Controller
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
                      returnKeyType={(isValid && 'done') || 'none'}
                      onSubmitEditing={() => {}}
                      blurOnSubmit={true}
                      keyboardType="number-pad"
                      textContentType="telephoneNumber"
                      textStyle={{borderColor: Colors.primary}}
                    />
                  )}
                /> */}
                <Button
                  title="generic.login.customer.buttons.send"
                  disabled={!isValid}
                  onPress={sendCode}
                  loading={isSending}
                />
              </>
            )}

            {customerMethod === 'verify-code' && (
              <>
                <Typography
                  variant="body1"
                  color="black1"
                  children="generic.login.customer.verifySubtitle"
                  textAlign="justify"
                />
                <CodeInput onCodeChange={text => setCode(text)} digits={6} />

                <Button
                  title={
                    sended
                      ? timerStr
                      : 'generic.login.customer.buttons.sendAgain'
                  }
                  variant="text"
                  colorScheme="primary"
                  onPress={sendAgain}
                  translate={!sended}
                  disabled={sended}
                />

                <Button
                  title="generic.login.customer.buttons.enter"
                  disabled={code.length < 6}
                  onPress={verifyCode}
                  loading={isVerifying}
                />

                <Button
                  title="generic.login.customer.buttons.anotherEmail"
                  variant="ghost"
                  colorScheme="primary"
                  onPress={useAnotherPhone}
                />
              </>
            )}
          </ContentFormStyle>

          <FooterContainerStyle>
            <SwitchButton>
              <SwitchButtonStyle
                title="generic.login.buttons.barber"
                colorScheme="primary"
                variant={userType === 'worker' ? 'filled' : 'text'}
                onPress={() => handleSwitchUserType('worker')}
              />
              <SwitchButtonStyle
                title="generic.login.buttons.customer"
                colorScheme="primary"
                variant={userType === 'customer' ? 'filled' : 'text'}
                onPress={() => handleSwitchUserType('customer')}
              />
            </SwitchButton>

            <Button
              title="generic.login.customer.link"
              colorScheme="primary"
              variant="text"
              onPress={goToSignUp}
            />
          </FooterContainerStyle>
        </ContentStyle>
      </ContainerStyle>
    </TouchableWithoutFeedback>
  );
};

export default CustomerLogin;
