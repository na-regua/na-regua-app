import {AuthService} from '@/app/api';
import {ILoginPhone} from '@/app/models';
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
import {phoneMask, phoneRegex} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
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
  const [timer, setTimer] = useState(60);
  const [sended, setSended] = useState(false);

  const timerStr = useMemo(() => {
    if (timer > 0) {
      const minutes = Math.floor(timer / 60);

      const seconds = timer % 60;

      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return 'generic.login.customer.buttons.sendAgain';
  }, [timer]);

  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ILoginPhone>({mode: 'all'});

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

  const sendCode = async () => {
    try {
      setIsSending(true);

      const {phone} = getValues();

      const {data} = await AuthService.sendOTPCode(phone);

      if (data.goToVerify) {
        setIsSending(false);

        dispatch(setCustomerMethod('verify-code'));
      }
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

  const goToSignUp = () => {
    navigation.navigate('/customer/sign-up');
  };

  const verifyCode = async () => {
    try {
      setIsVerifying(true);
      const {phone} = getValues();
      const {data} = await AuthService.verifyOTPCode(code, phone);

      if (data) {
        const {accessToken} = data;

        await dispatch(setPersistedToken(accessToken));

        if (data.user) {
          dispatch(setUser(data.user));

          navigation.navigate('/customer/home');
        }
      }

      setIsVerifying(false);
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

  useEffect(() => {
    if (timer && timer > 0) {
      const interval = setInterval(() => {
        const newTimer = timer - 1;
        setTimer(newTimer);

        if (newTimer === 0) {
          setSended(false);
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [timer]);

  const sendAgain = async () => {
    try {
      await AuthService.sendOTPCode(getValues().phone);

      setSended(true);
      setTimer(60);
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

  const useAnotherPhone = () => {
    dispatch(setCustomerMethod('phone'));
  };

  return (
    <TouchableWithoutFeedback
      style={customerLoginStyles.flex1}
      onPress={() => Keyboard.dismiss()}>
      <ContainerStyle
        contentContainerStyle={[
          insetsStyles,
          customerLoginStyles.scrollContainer,
        ]}>
        <ContentStyle>
          <ContentFormStyle>
            <LogoContainerStyle>
              <Icons.LogoMiniIcon disabled width={80} height={80} />
              <Icons.LogoWritingIcon width={220} height={50} />
            </LogoContainerStyle>
            {customerMethod === 'phone' && (
              <>
                <Typography
                  variant="body1"
                  color="black1"
                  children="generic.login.customer.phoneSubtitle"
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
                      returnKeyType="done"
                      onSubmitEditing={() => {}}
                      blurOnSubmit={true}
                      keyboardType="number-pad"
                      textContentType="telephoneNumber"
                      textStyle={{borderColor: Colors.primary}}
                    />
                  )}
                />
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
                  title={timerStr}
                  variant="text"
                  colorScheme="primary"
                  disabled={sended}
                  onPress={sendAgain}
                />

                <Button
                  title="generic.login.customer.buttons.enter"
                  disabled={code.length < 6}
                  onPress={verifyCode}
                  loading={isVerifying}
                />

                <Button
                  title="generic.login.customer.buttons.anotherPhone"
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
