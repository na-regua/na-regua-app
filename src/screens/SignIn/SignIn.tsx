import React from 'react';

import {Header} from '@/components/molecules';
import {SignInContent} from '@/components/pages';
import Colors from '@/theme/colors';
import Metrics from '@/theme/metrics';

import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SignIn: React.FC = () => {
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[styles.signInContainer, insetsStyles]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.main}
      />
      <View style={styles.signInContent}>
        <Header />
        <SignInContent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgLight,
  },
  signInContent: {
    flex: 1,
    width: Metrics.screenWidth,
    flexDirection: 'column',
    padding: Metrics.basePadding,
    gap: 18,
  },
});

export default SignIn;
