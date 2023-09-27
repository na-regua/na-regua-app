import {Button, Input, Step, Typography} from '@/components/atoms';
import {Stepper} from '@/components/molecules';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';

const SignInContent: React.FC = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.scrollContent}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.scrollWrapper}>
          <View style={styles.scrollContentTitle}>
            <Typography variant="h2">{t('barber.signIn.title')}</Typography>
            <Typography variant="body2" color="black1">
              {t('barber.signIn.subtitle')}
            </Typography>
          </View>
          <Stepper initialStep={1}>
            <Step title={t('barber.signIn.steps.1')} number={1}>
              <Input label="Nome" />
              <Input label="E-mail" autoCapitalize="none" />
              <Input label="Senha" autoCapitalize="none" />
            </Step>
            <Step title={t('barber.signIn.steps.2')} number={2}>
              <Input label="Cep" />
            </Step>
            <Step title={t('barber.signIn.steps.3')} number={3} />
            <Step title={t('barber.signIn.steps.4')} number={4} />
          </Stepper>
        </View>
      </ScrollView>
      <Button title="Enviar" />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
  },
  scrollWrapper: {
    flex: 1,
    flexDirection: 'column',
    gap: 18,
  },
  scrollContentTitle: {
    flexDirection: 'column',
    gap: 4,
  },
});

export default SignInContent;
