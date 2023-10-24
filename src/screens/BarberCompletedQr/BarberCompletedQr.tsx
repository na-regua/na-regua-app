import React from 'react';
import {ContainerStyle, ContentStyle} from './styles';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Header} from '@/components/molecules';

const BarberCompletedQr: React.FC = () => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <Header showTitle={false} lightContent />
      <ContentStyle></ContentStyle>
    </ContainerStyle>
  );
};

export default BarberCompletedQr;
