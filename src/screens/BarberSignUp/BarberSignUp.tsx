import React from 'react';

import {Header} from '@/components/molecules';
import {SignUpForm} from '@/components/pages';
import Colors from '@/theme/colors';
import Metrics from '@/theme/metrics';

import {useTranslation} from 'react-i18next';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BarberSignUp: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[styles.signInContainer, insetsStyles]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <View style={styles.signInContent}>
        <Header
          showTitle
          title={t('barber.signUp.title')}
          subtitle={t('barber.signUp.subtitle')}
        />
        <SignUpForm />
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
    padding: Metrics.smPadding,
    gap: 18,
  },
});

export default BarberSignUp;
