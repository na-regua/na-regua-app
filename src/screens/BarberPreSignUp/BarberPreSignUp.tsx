import {Button} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {SKIP_PRE_SIGN_UP_KEY} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';

const BarberPreSignUp: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleSkipPreSignUp = async () => {
    try {
      await AsyncStorage.setItem(SKIP_PRE_SIGN_UP_KEY, 'true');

      navigation.navigate(APP_ROUTES.BARBER_QUEUE);
    } catch (error) {}
  };

  const navigateToWorkers = () => {
    navigation.navigate(APP_ROUTES.BARBER_PRE_WORKERS);
  };

  return (
    <View style={[insetsStyles, styles.container]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
      <Header
        title={t('barber.preSignUp.title')}
        subtitle={t('barber.preSignUp.subtitle')}
      />
      <View style={styles.content}>
        <View style={styles.actions}>
          <Button
            variant="outlined"
            title={t('barber.preSignUp.buttons.later')}
            onPress={handleSkipPreSignUp}
          />
          <Button
            onPress={navigateToWorkers}
            title={t('barber.preSignUp.buttons.now')}
          />
        </View>
      </View>
    </View>
  );
};

export default BarberPreSignUp;
