import {Button, Typography} from '@/components/atoms';
import {TLoginSteps} from '@/app/models';
import {useAppNavigation} from '@/navigation';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface ILoginWelcomeProps {
  onLoginMethod: (method: TLoginSteps) => void;
}

const LoginWelcome: React.FC<ILoginWelcomeProps> = ({onLoginMethod}) => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const handleNavigateToSignUp = () => {
    navigation.navigate('/barber/sign-up');
  };

  return (
    <View style={styles.content}>
      <View>
        <Typography variant="h4" color="white3">
          Na Régua
        </Typography>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Typography variant="h4" color="black2">
            {t('generic.login.title')}
          </Typography>
          <Typography variant="body2" color="black1">
            {t('generic.login.subtitle')}
          </Typography>
        </View>
        <Button
          onPress={() => onLoginMethod('e-mail')}
          title={t('generic.login.buttons.email')}
        />
        <Button
          onPress={() => onLoginMethod('whatsapp')}
          title={t('generic.login.buttons.whatsapp')}
          colorScheme="success"
        />
      </View>
      <TouchableOpacity onPress={handleNavigateToSignUp}>
        <Typography variant="button" color="primary">
          {t('generic.login.signUp')}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWelcome;
