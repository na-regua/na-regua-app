import {Button} from '@/components/atoms';
import {
  BarberLoginMailForm,
  BarberLoginPhoneForm,
} from '@/components/molecules';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TUserType, setLoginMethod, setLoginUserType} from '@/store/slicers';
import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {SwitchButton, SwitchButtonStyle} from '../Login/styles';
import {
  ContainerStyle,
  ContentStyle,
  FooterContainerStyle,
  TouchableWithoutFeedbackStyle,
  barberLoginStyles,
} from './styles';

const BarberLogin = () => {
  const insets = useSafeAreaInsets();
  const {userType, method} = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

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

  const navigateToBarberRegister = () => {
    navigation.navigate('/barber/sign-up');
  };

  const setAutoMethod = () => {
    if (method === 'welcome') {
      dispatch(setLoginMethod('e-mail'));
    }
  };

  useEffect(() => {
    setAutoMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableWithoutFeedbackStyle onPress={() => Keyboard.dismiss()}>
      <ContainerStyle
        contentContainerStyle={[
          insetsStyles,
          barberLoginStyles.scrollContainer,
        ]}>
        <ContentStyle>
          {method === 'e-mail' && <BarberLoginMailForm />}
          {(method === 'phone' || method === 'verify-code') && (
            <BarberLoginPhoneForm />
          )}
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
              title="generic.login.barber.link"
              colorScheme="primary"
              variant="text"
              onPress={navigateToBarberRegister}
            />
          </FooterContainerStyle>
        </ContentStyle>
      </ContainerStyle>
    </TouchableWithoutFeedbackStyle>
  );
};

export default BarberLogin;
