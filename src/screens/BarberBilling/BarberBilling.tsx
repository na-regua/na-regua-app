import {AppStatusBar} from '@/components/atoms';
import {Header} from '@/components/molecules';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ContainerStyle} from './styles';

const BarberBilling: React.FC = () => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />

      <Header.Container>
        <Header.Actions />
        <Header.Welcome />
        <Header.Border />
      </Header.Container>
    </ContainerStyle>
  );
};

export default BarberBilling;
