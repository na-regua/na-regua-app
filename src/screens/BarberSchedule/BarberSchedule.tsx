import {Header} from '@/components/molecules';
import {BottomNav} from '@/navigation';
import React from 'react';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
      <Header showTitle={false} showBorder showWelcome />

      <BottomNav />
    </ContainerStyle>
  );
};

export default BarberSchedule;
