import {AuthService} from '@/app/api';
import {AvoidKeyboard, Button, CodeInput, Typography} from '@/components/atoms';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {createNotification, setPersistedToken, setUser} from '@/store/slicers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {
  CVCodeInput,
  CVContainerStyled,
  CVContentStyled,
  CVHeaderStyled,
  CVNoFeedbackStyled,
} from './styles';
import {CacheManager} from '@georstat/react-native-image-cache';

const CustomerSignUpVerify: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/sign-up/verify'>
> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [isVerifying, setIsVerifying] = useState(false);

  const [code, setCode] = useState('');

  const isValid = useMemo(() => code.length === 6, [code]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const verifyCode = async () => {
    const phone = route.params?.phone;

    if (!phone) {
      return;
    }

    setIsVerifying(true);

    try {
      const {data} = await AuthService.verifyOTPCode(code, phone.toString());

      if (data) {
        const {access_token} = data;

        await dispatch(setPersistedToken(access_token));

        if (data.user) {
          await dispatch(setPersistedToken(access_token));

          if (data.user.avatar.url) {
            CacheManager.prefetch(data.user.avatar.url);
          }

          if (data.barber.avatar.url) {
            CacheManager.prefetch(data.barber.avatar.url);
          }

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

  return (
    <CVNoFeedbackStyled
      onPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      }}>
      <CVContainerStyled style={insetsStyles}>
        <AvoidKeyboard keyboardBackgroundColor="bgLight">
          <CVContentStyled>
            <CVHeaderStyled>
              <Typography variant="h2" color="black3">
                {'customer.verify.title'}
              </Typography>
              <Typography variant="body2" color="black1">
                {'customer.verify.subtitle'}
              </Typography>
            </CVHeaderStyled>
            <CVCodeInput>
              <CodeInput
                digits={6}
                onCodeChange={text => {
                  setCode(text);
                }}
                showDoneButton={code.length === 6}
              />
              <Button
                variant="text"
                colorScheme="primary"
                title="generic.login.barber.again"
              />
            </CVCodeInput>

            <Button
              title="customer.verify.buttons.send"
              disabled={!isValid}
              onPress={verifyCode}
              loading={isVerifying}
            />
          </CVContentStyled>
        </AvoidKeyboard>
      </CVContainerStyled>
    </CVNoFeedbackStyled>
  );
};

export default CustomerSignUpVerify;
