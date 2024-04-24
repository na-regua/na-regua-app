import {ICreateUser} from '@/app/models';
import {Input, Step, Typography} from '@/components/atoms';
import {Colors} from '@/theme';
import {phoneMask, phoneRegex} from '@/utils';
import React, {useRef, useState} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export interface IProfileStepProps {
  form: UseFormReturn<ICreateUser>;
  completed?: boolean;
  goNext?: () => void;
}

const ProfileStep: React.FC<IProfileStepProps> = ({
  form,
  completed,
  goNext,
}) => {
  const {t} = useTranslation();
  const {
    control,
    formState: {isValid},
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const fieldsRef = {
    name: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
  };

  return (
    <Step
      title={t('barber.signUp.steps.1.title')}
      description={t('barber.signUp.steps.1.description')}
      number={1}
      completed={completed}>
      <Controller
        name="name"
        control={control}
        rules={{required: true}}
        render={({field: {onChange}}) => (
          <Input
            label={t('barber.signUp.fields.name')}
            onChangeText={onChange}
            returnKeyType="next"
            inputRef={fieldsRef.name}
            onSubmitEditing={() => fieldsRef.email.current?.focus()}
            blurOnSubmit={false}
            textContentType="name"
            textStyle={{borderColor: Colors.primary}}
          />
        )}
      />

      <Controller
        name="email"
        rules={{required: true}}
        control={control}
        render={({field: {onChange}}) => (
          <Input
            label={t('barber.signUp.fields.email')}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => {
              onChange(text);
            }}
            inputRef={fieldsRef.email}
            returnKeyType="next"
            onSubmitEditing={() => fieldsRef.password.current?.focus()}
            blurOnSubmit={false}
            textContentType="emailAddress"
            textStyle={{borderColor: Colors.primary}}
          />
        )}
      />

      <Controller
        name="password"
        rules={{required: true, minLength: 5}}
        control={control}
        render={({field: {onChange}}) => (
          <Input
            label={t('barber.signUp.fields.password')}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            suffix={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleShowPassword}>
                <Typography variant="button" color="primary">
                  {showPassword ? 'generic.login.hide' : 'generic.login.show'}
                </Typography>
              </TouchableOpacity>
            }
            inputRef={fieldsRef.password}
            returnKeyType="next"
            onSubmitEditing={() => fieldsRef.phone.current?.focus()}
            blurOnSubmit={false}
            textContentType="password"
            textStyle={{borderColor: Colors.primary}}
          />
        )}
      />

      <Controller
        name="phone"
        rules={{required: true, pattern: phoneRegex}}
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            label={t('barber.signUp.fields.phone')}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={text => {
              const maskedValue = phoneMask(text);
              onChange(maskedValue);
            }}
            value={value}
            inputRef={fieldsRef.phone}
            returnKeyType={isValid ? 'done' : 'none'}
            onSubmitEditing={() => {
              if (isValid && goNext) {
                goNext();
              }
            }}
            textContentType="telephoneNumber"
            textStyle={{borderColor: Colors.primary}}
          />
        )}
      />
    </Step>
  );
};

export default ProfileStep;
