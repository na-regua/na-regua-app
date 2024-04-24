import React, {useMemo} from 'react';

import {Header} from '@/components/molecules';
import {SignUpForm} from '@/components/pages';

import {useKeyboardVisible} from '@/hooks';
import {useAppNavigation} from '@/navigation';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ContainerStyle, TouchableWithoutFeedbackStyle} from './styles';

const BarberSignUp: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const {isKeyboardVisible} = useKeyboardVisible();

  const insetsStyles = useMemo(
    () => ({
      paddingTop: insets.top,
      paddingBottom: isKeyboardVisible ? 0 : insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }),
    [isKeyboardVisible, insets],
  );

  const backToLogin = () => {
    navigation.navigate('/generic/login/barber');
  };

  return (
    <TouchableWithoutFeedbackStyle onPress={() => Keyboard.dismiss()}>
      <ContainerStyle style={[insetsStyles]}>
        <Header
          showBack
          showActions={false}
          showTitle={false}
          showBorder
          onBackPress={backToLogin}
        />

        <SignUpForm />
      </ContainerStyle>
    </TouchableWithoutFeedbackStyle>
  );
};

export default BarberSignUp;
