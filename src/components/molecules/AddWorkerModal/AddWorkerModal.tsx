import React, {useState} from 'react';
import {View} from 'react-native';
import {addWorkerStyles} from './styles';
import {Avatar, Button, Input} from '@/components/atoms';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {phoneMask} from '@/utils';
import {Asset} from 'react-native-image-picker';

export interface IAddWorkerForm {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface IAddWorkerModalProps {
  onSave?: (formValues: IAddWorkerForm, avatar: Asset) => void;
}

const AddWorkerModal: React.FC<IAddWorkerModalProps> = ({onSave}) => {
  const {t} = useTranslation();
  const {control, formState, getValues} = useForm<IAddWorkerForm>({
    mode: 'all',
  });
  const [avatarFile, setAvatarFile] = useState<Asset | undefined>(undefined);

  const handleOnAvatarChange = (file: Asset) => {
    setAvatarFile(file);
  };

  const handleOnSave = () => {
    if (onSave && avatarFile) {
      const formValues = getValues();
      onSave(formValues, avatarFile);
    }
  };

  return (
    <View style={addWorkerStyles.container}>
      <View style={addWorkerStyles.avatarWrapper}>
        <Avatar onAvatarChange={handleOnAvatarChange} />
      </View>
      <Controller
        name="name"
        control={control}
        rules={{required: true}}
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
        rules={{required: true}}
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
        rules={{required: true}}
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

      <Button
        title={t('modals.addWorker.buttons.add')}
        colorScheme="primary"
        disabled={!formState.isValid || !avatarFile}
        onPress={handleOnSave}
      />
    </View>
  );
};

export default AddWorkerModal;
