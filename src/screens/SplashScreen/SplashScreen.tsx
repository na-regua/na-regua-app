import {Loader, Typography} from '@/components/atoms';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';

const SplashScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[insetsStyles, styles.container]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <View style={styles.content}>
        <Loader color="white3" size="large" />
        <Typography variant="h2" color="white3">
          Na Régua
        </Typography>
      </View>
    </View>
  );
};

export default SplashScreen;
