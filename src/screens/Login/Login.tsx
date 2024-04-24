import {AppStatusBar, Icons, Typography} from '@/components/atoms';

import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TUserType, setLoginMethod, setLoginUserType} from '@/store/slicers';
import {Fonts} from '@/theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  Container,
  SwitchButton,
  SwitchButtonStyle,
  WelcomeContent,
  WelcomeTitle,
} from './styles';

const Login: React.FC = () => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const {t} = useTranslation();

  const {userType} = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<AppDispatch>();

  const navigation = useAppNavigation();

  const handleSwitchUserType = (type: TUserType) => {
    dispatch(setLoginUserType(type));

    if (type === 'worker') {
      dispatch(setLoginMethod('e-mail'));

      navigation.navigate('/generic/login/barber');
    }

    if (type === 'customer') {
      navigation.navigate('/generic/login/customer');
    }
  };

  return (
    <Container style={insetsStyles}>
      <AppStatusBar barStyle="dark-content" />
      <WelcomeContent>
        <WelcomeTitle>
          <Typography
            variant="h4"
            style={{
              fontWeight: Fonts.weights.regular,
            }}
            color="black3">
            {t('generic.login.title')}
          </Typography>
          <Icons.LogoWritingIcon />
          <Typography variant="body1" color="primary">
            {t('generic.login.subtitle1')}
            {'\n'}
            {t('generic.login.subtitle2')}
          </Typography>
        </WelcomeTitle>
        <SwitchButton>
          <SwitchButtonStyle
            title={t('generic.login.buttons.barber')}
            colorScheme="primary"
            variant={userType === 'worker' ? 'filled' : 'text'}
            onPress={() => handleSwitchUserType('worker')}
          />
          <SwitchButtonStyle
            title={t('generic.login.buttons.customer')}
            colorScheme="primary"
            variant={userType === 'customer' ? 'filled' : 'text'}
            onPress={() => handleSwitchUserType('customer')}
          />
        </SwitchButton>
        <Icons.LinesIcon />
      </WelcomeContent>
    </Container>
  );
};

export default Login;
