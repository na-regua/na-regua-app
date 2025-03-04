import {AuthService} from '@/app/api';
import {ILoginEmail, SystemErrors, UserRoles} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  AuthThunks,
  TUserType,
  createNotification,
  setLoginUserType,
  setUser,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {CacheManager} from '@georstat/react-native-image-cache';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
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
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ILoginEmail>({mode: 'all'});

  const fieldsRef = {
    phone: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
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

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const goToSignUp = () => {
    navigation.navigate('/customer/sign-up');
  };

  const login = async () => {
    try {
      setIsSending(true);
      const {email, password} = getValues();

      const {data} = await AuthService.loginWithEmail({email, password});

      if (data) {
        const {access_token} = data;

        await dispatch(AuthThunks.setPersistedToken(access_token));

        if (data.user) {
          if (data.user.role !== UserRoles.Customer) {
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

          if (data.user.avatar.url) {
            CacheManager.prefetch(data.user.avatar.url);
          }

          dispatch(setUser(data.user));

          setIsSending(false);
          navigation.navigate('/customer/home');
        }
      }
    } catch (error) {
      setIsSending(false);
    }
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
                            {showPassword
                              ? 'generic.login.hide'
                              : 'generic.login.show'}
                          </Typography>
                        </TouchableOpacity>
                      }
                      inputRef={fieldsRef.password}
                      returnKeyType="done"
                      onSubmitEditing={() => isValid && login()}
                      blurOnSubmit={true}
                      textStyle={{borderColor: Colors.primary}}
                    />
                  )}
                />

                <Button
                  title="generic.login.customer.buttons.enter"
                  disabled={!isValid}
                  onPress={login}
                  loading={isSending}
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
