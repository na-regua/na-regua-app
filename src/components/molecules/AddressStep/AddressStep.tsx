import {Input, Step} from '@/components/atoms';
import ENDPOINTS from '@/app/api/endpoints';
import {ICepApiData} from '@/app/models';
import {maskCep} from '@/utils';
import axios from 'axios';
import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

export interface IAdressFormData {
  cep: string;
  localidade: string;
  complemento: string;
  numero: string;
  bairro: string;
  uf: string;
  logradouro: string;
}

interface IAdressStepProps {
  form: UseFormReturn<IAdressFormData>;
  completed?: boolean;
  canJumpTo?: boolean;
}

const AddressStep: React.FC<IAdressStepProps> = ({
  form,
  completed,
  canJumpTo,
}) => {
  const {t} = useTranslation();

  const {control, trigger} = form;

  const handlePostalCodeChange = async (text: string) => {
    const removeMasktext = text.replace(/\D/g, '');

    if (removeMasktext.length >= 8) {
      try {
        const {data} = await axios.get<ICepApiData>(
          ENDPOINTS.VIA_CEP(removeMasktext),
        );

        const sameKeys: string[] = [
          'localidade',
          'complemento',
          'bairro',
          'uf',
          'logradouro',
        ];

        Object.keys(data).forEach(key => {
          if (sameKeys.includes(key)) {
            form.setValue(
              key as keyof IAdressFormData,
              data[key as keyof ICepApiData],
            );
          }
        });

        trigger();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Step
      title={t('barber.signUp.steps.2.title')}
      description={t('barber.signUp.steps.2.description')}
      number={2}
      disabled={!canJumpTo}
      completed={completed}>
      <Controller
        name="cep"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.postalCode')}
            keyboardType="numeric"
            onChangeText={text => {
              const maskedText = maskCep(text);
              handlePostalCodeChange(maskedText);
              onChange(maskedText);
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        name="logradouro"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.street')}
            onChangeText={text => {
              const maskedText = maskCep(text);
              handlePostalCodeChange(maskedText);
              onChange(maskedText);
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <View style={styles.formRow}>
        <Controller
          name="complemento"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('barber.signUp.fields.complement')}
              wrapperStyle={styles.formRowField}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          name="numero"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('barber.signUp.fields.number')}
              keyboardType="numeric"
              wrapperStyle={styles.formRowFieldHalf}
              onChangeText={text => {
                const maskedText = maskCep(text);
                handlePostalCodeChange(maskedText);
                onChange(maskedText);
              }}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>
      <View style={styles.formRow}>
        <Controller
          name="localidade"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('barber.signUp.fields.city')}
              wrapperStyle={styles.formRowField}
              onChangeText={text => {
                const maskedText = maskCep(text);
                handlePostalCodeChange(maskedText);
                onChange(maskedText);
              }}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          name="uf"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('barber.signUp.fields.uf')}
              wrapperStyle={styles.formRowFieldHalf}
              onChangeText={text => {
                const maskedText = maskCep(text);
                handlePostalCodeChange(maskedText);
                onChange(maskedText);
              }}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>
      <Controller
        name="bairro"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.neighborhood')}
            wrapperStyle={styles.formRowFieldHalf}
            onChangeText={text => {
              const maskedText = maskCep(text);
              handlePostalCodeChange(maskedText);
              onChange(maskedText);
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
    </Step>
  );
};

const styles = StyleSheet.create({
  formRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 18,
  },
  formRowField: {
    flex: 1,
  },
  formRowFieldHalf: {
    flex: 0.3,
  },
});

export default AddressStep;
