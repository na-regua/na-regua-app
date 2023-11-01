import ENDPOINTS from '@/app/api/endpoints';
import {ICepApiData} from '@/app/models';
import {Input, Step} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {maskCep, numberMask, ufMask} from '@/utils';
import axios, {AxiosError} from 'axios';
import React, {useRef} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

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
  goNext?: () => void;
}

const AddressStep: React.FC<IAdressStepProps> = ({
  form,
  completed,
  canJumpTo,
  goNext,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    trigger,
    formState: {isValid},
  } = form;

  const cepRef = useRef<TextInput>(null);
  const logradouroRef = useRef<TextInput>(null);
  const complementoRef = useRef<TextInput>(null);
  const numeroRef = useRef<TextInput>(null);
  const localidadeRef = useRef<TextInput>(null);
  const ufRef = useRef<TextInput>(null);
  const bairroRef = useRef<TextInput>(null);

  const handlePostalCodeChange = async (text: string) => {
    const removeMasktext = text.replace(/\D/g, '');

    if (removeMasktext.length >= 8) {
      try {
        const {data} = await axios.get<ICepApiData>(
          ENDPOINTS.VIA_CEP(removeMasktext),
        );

        if (!!data.erro && data.erro) {
          throw new AxiosError('CEP não encontrado');
        }

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
              data[key as keyof ICepApiData] as string,
            );
          }
        });

        trigger();
      } catch (error) {
        if (error instanceof AxiosError) {
          const {message} = error;

          if (message) {
            dispatch(
              createNotification({
                id: 'search-cep',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  return (
    <Step
      title={t('barber.signUp.steps.2.title')}
      description={t('barber.signUp.steps.2.description')}
      number={2}
      disabled={!canJumpTo}
      completed={completed}
      focusField={cepRef}>
      <Controller
        name="cep"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            inputRef={cepRef}
            label={t('barber.signUp.fields.postalCode')}
            keyboardType="numeric"
            onChangeText={text => {
              const maskedText = maskCep(text);
              handlePostalCodeChange(maskedText);
              onChange(maskedText);
            }}
            onBlur={onBlur}
            value={value}
            returnKeyType="done"
            onSubmitEditing={() => logradouroRef.current?.focus()}
            blurOnSubmit={false}
            textContentType="postalCode"
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
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            inputRef={logradouroRef}
            returnKeyType="next"
            onSubmitEditing={() => complementoRef.current?.focus()}
            blurOnSubmit={false}
            textContentType="fullStreetAddress"
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
              inputRef={complementoRef}
              returnKeyType="next"
              onSubmitEditing={() => numeroRef.current?.focus()}
              blurOnSubmit={false}
              textContentType="streetAddressLine2"
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
                const maskedText = numberMask(text);
                handlePostalCodeChange(maskedText);
                onChange(maskedText);
              }}
              onBlur={onBlur}
              value={value}
              inputRef={numeroRef}
              returnKeyType="done"
              onSubmitEditing={() => localidadeRef.current?.focus()}
              blurOnSubmit={false}
              textContentType="streetAddressLine2"
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
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputRef={localidadeRef}
              returnKeyType="next"
              onSubmitEditing={() => ufRef.current?.focus()}
              blurOnSubmit={false}
              textContentType="addressCity"
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
                const maskedText = ufMask(text);
                onChange(maskedText);
              }}
              onBlur={onBlur}
              value={value}
              inputRef={ufRef}
              returnKeyType="next"
              onSubmitEditing={() => bairroRef.current?.focus()}
              blurOnSubmit={false}
              textContentType="addressState"
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
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            inputRef={bairroRef}
            returnKeyType="done"
            onSubmitEditing={() => {
              if (isValid && goNext) {
                goNext();
              }
            }}
            textContentType="sublocality"
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
