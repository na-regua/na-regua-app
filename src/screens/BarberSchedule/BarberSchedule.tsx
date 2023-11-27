import {AppStatusBar} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {BottomNav} from '@/navigation';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ContainerStyle} from './styles';

const BarberSchedule: React.FC = () => {
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
      <Header showTitle={false} showBorder showWelcome />

      <BottomNav />
    </ContainerStyle>
  );
};

export default BarberSchedule;
