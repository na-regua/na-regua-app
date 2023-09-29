import {Button, Typography} from '@/components/atoms';
import {Colors, Metrics} from '@/theme';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const [loginMethod, setLoginMethod] = React.useState<'email' | 'whatsapp'>();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[styles.container, insetsStyles]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <View style={styles.splash} />
      <View style={styles.content}>
        <View>
          <Typography variant="h4" color="white3">
            Na Régua
          </Typography>
        </View>
        <View style={styles.loginCard}>
          <View style={styles.loginCardHeader}>
            <Typography variant="h4" color="black2">
              {t('generic.login.title')}
            </Typography>
            <Typography variant="body2" color="black1">
              {t('generic.login.subtitle')}
            </Typography>
          </View>
          <Button title={t('generic.login.buttons.email')} />
          <Button title={t('generic.login.buttons.whatsapp')} theme="success" />
        </View>
        <TouchableOpacity>
          <Typography variant="button" color="primary">
            {t('generic.login.signUp')}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    backgroundColor: Colors.main,
  },
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.border,
    position: 'relative',
  },
  content: {
    flex: 1,
    width: Metrics.screenWidth,
    flexDirection: 'column',
    padding: Metrics.mdPadding,
    gap: Metrics.mdPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    flexDirection: 'column',
    backgroundColor: Colors.bgLight,
    width: Metrics.screenWidth - 2 * Metrics.mdPadding,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
    borderRadius: 18,
  },
  loginCardHeader: {
    flexDirection: 'column',
    gap: 8,
  },
});

export default Login;
