import {Button, Input, Step, Typography} from '@/components/atoms';
import {Stepper} from '@/components/molecules';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const SignInContent: React.FC = () => {
  return (
    <View style={styles.scrollContent}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.scrollWrapper}>
          <View style={styles.scrollContentTitle}>
            <Typography variant="h2">Cadastro</Typography>
            <Typography variant="body2" color="black1">
              Preencha as informações do perfil.
            </Typography>
          </View>
          <Stepper initialStep={1}>
            <Step title="Perfil" number={1}>
              <Input label="Nome" />
              <Input label="E-mail" />
              <Input label="Senha" />
            </Step>
            <Step title="Endereço" number={2}>
              <Input label="Cep" />
            </Step>
            <Step title="Fotos do local" number={3} />
            <Step title="Avatar" number={4} />
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
