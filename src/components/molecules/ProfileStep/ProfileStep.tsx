import {ICreateUser} from '@/core/models';
import {Icons, Input, Step} from '@/components/atoms';
import {phoneMask} from '@/utils';
import React, {useEffect, useState} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';

interface IProfileStepProps {
  form: UseFormReturn<ICreateUser>;
  completed?: boolean;
}

const ProfileStep: React.FC<IProfileStepProps> = ({form, completed}) => {
  const {t} = useTranslation();
  const {register, control} = form;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  useEffect(() => {
    register('name', {required: true});
    register('email', {required: true});
    register('phone', {required: true});
    register('password', {required: true});
  }, [register]);

  return (
    <Step
      title={t('barber.signUp.steps.1.title')}
      description={t('barber.signUp.steps.1.description')}
      number={1}
      completed={completed}>
      <Controller
        name="name"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.name')}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.phone')}
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={text => {
              const maskedValue = phoneMask(text);
              onChange(maskedValue);
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.email')}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => {
              onChange(text);
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={t('barber.signUp.fields.password')}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            suffix={
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handleShowPassword}>
                <Icons.EyeIcon
                  width={20}
                  height={20}
                  closed={showPassword}
                  color="default"
                />
              </TouchableOpacity>
            }
          />
        )}
      />
    </Step>
  );
};

export default ProfileStep;
