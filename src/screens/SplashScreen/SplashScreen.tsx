import {AppStatusBar, Icons, Loader} from '@/components/atoms';
import {Colors} from '@/theme';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SpashContentStyle, SplashContainerStyle} from './styles';

const SplashScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <SplashContainerStyle style={insetsStyles}>
      <AppStatusBar color={Colors.main} barStyle="light-content" />
      <SpashContentStyle>
        <Icons.LogoMiniIcon width={92} height={92} />
        <Icons.LogoWritingIcon width={260} height={60} />
        <Loader color={Colors.main} strokeWidth={4} />
      </SpashContentStyle>
    </SplashContainerStyle>
  );
};

export default SplashScreen;
