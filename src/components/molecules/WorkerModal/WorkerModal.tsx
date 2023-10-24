import {WorkersService} from '@/app/api';
import {IBuffer} from '@/app/models';
import {Avatar, Button, Checkbox, Icons, Input} from '@/components/atoms';
import {assetToBuffer, phoneMask} from '@/utils';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Asset} from 'react-native-image-picker';
import {AvatarWrapperStyle, ScrollViewStyle, styles} from './styles';
import {AxiosError} from 'axios';
import {createNotification} from '@/store/slicers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/store/Store';

export interface IWorkerForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  admin: boolean;
}

interface IWorkerModalProps {
  modalRef: React.RefObject<BottomSheetModal | null>;
  onClose?: () => void;
  mode: 'add' | 'edit';
  initialValues?: Partial<IWorkerForm>;
  avatar?: string;
  workerID?: string;
}

const WorkerModal: React.FC<IWorkerModalProps> = ({
  avatar,
  initialValues,
  modalRef,
  mode,
  workerID,
  onClose,
}) => {
  const {t} = useTranslation();
  const defaultValues = mode === 'edit' ? initialValues : undefined;

  const {control, watch, formState} = useForm<IWorkerForm>({
    mode: 'all',
    defaultValues,
  });
  const [avatarFile, setAvatarFile] = useState<Asset | undefined>(undefined);
  const [changedAvatar, setChangedAvatar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const formValues = watch();

  const fieldsRef = {
    name: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
  };

  const handleOnAvatarChange = (file: Asset) => {
    setAvatarFile(file);

    setChangedAvatar(true);
  };

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const handleOnAdd = async () => {
    if (avatarFile) {
      setLoading(true);

      try {
        const avatarBuffer = assetToBuffer([avatarFile])[0];

        const response = await WorkersService.createWorker(
          formValues,
          avatarBuffer,
        );

        if (response) {
          if (modalRef.current) {
            modalRef.current.close();
            onClose && onClose();

            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);

        if (error instanceof AxiosError) {
          const {message} = error.response?.data;

          if (message) {
            dispatch(
              createNotification({
                id: 'add-service',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  const handleOnUpdate = async () => {
    if (workerID) {
      setLoading(true);

      try {
        const params: Partial<IWorkerForm> = {
          ...formValues,
        };

        let avatarBuffer: IBuffer | undefined;

        if (changedAvatar && avatarFile) {
          avatarBuffer = assetToBuffer([avatarFile])[0];
        }

        const response = await WorkersService.updateWorker(
          workerID,
          params,
          avatarBuffer,
        );

        if (response) {
          if (modalRef.current) {
            modalRef.current.close();
            onClose && onClose();

            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);

        if (error instanceof AxiosError) {
          const {message} = error.response?.data;

          if (message) {
            dispatch(
              createNotification({
                id: 'update-service',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  const hasDiff = useMemo(
    () =>
      formValues.name !== initialValues?.name ||
      formValues.email !== initialValues?.email ||
      formValues.phone !== initialValues?.phone ||
      formValues.admin !== initialValues?.admin ||
      changedAvatar,
    [formValues, initialValues, changedAvatar],
  );

  const isValid = useMemo(() => {
    if (mode === 'add') {
      return formState.isValid && avatarFile;
    } else {
      return formState.isValid && hasDiff;
    }
  }, [mode, formState.isValid, avatarFile, hasDiff]);

  return (
    <TouchableWithoutFeedback
      style={styles.flex1}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.flex1}
        enabled
        behavior="padding"
        keyboardVerticalOffset={48}>
        <ScrollViewStyle
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <AvatarWrapperStyle>
            <Avatar
              initialAvatar={avatar}
              onAvatarChange={handleOnAvatarChange}
            />
          </AvatarWrapperStyle>
          <Controller
            name="name"
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('modals.worker.fields.name')}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={fieldsRef.name}
                returnKeyType="next"
                onSubmitEditing={() => fieldsRef.email.current?.focus()}
                blurOnSubmit={false}
                textContentType="name"
              />
            )}
          />

          <Controller
            name="email"
            rules={{required: true}}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('modals.worker.fields.email')}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => {
                  onChange(text);
                }}
                onBlur={onBlur}
                value={value}
                inputRef={fieldsRef.email}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (mode === 'add') {
                    fieldsRef.password.current?.focus();
                  } else {
                    fieldsRef.phone.current?.focus();
                  }
                }}
                blurOnSubmit={false}
                textContentType="emailAddress"
              />
            )}
          />

          {mode === 'add' && (
            <Controller
              name="password"
              control={control}
              rules={{required: true, minLength: 6}}
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
                  inputRef={fieldsRef.password}
                  returnKeyType="next"
                  onSubmitEditing={() => fieldsRef.phone.current?.focus()}
                  blurOnSubmit={false}
                  textContentType="password"
                />
              )}
            />
          )}
          <Controller
            name="phone"
            rules={{required: true}}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('modals.worker.fields.phone')}
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChangeText={text => {
                  const maskedValue = phoneMask(text);
                  onChange(maskedValue);
                }}
                onBlur={onBlur}
                value={value}
                inputRef={fieldsRef.phone}
                returnKeyType="done"
                onSubmitEditing={() => fieldsRef.phone.current?.blur()}
                textContentType="telephoneNumber"
              />
            )}
          />

          <Controller
            name="admin"
            control={control}
            render={({field: {onChange, value}}) => (
              <Checkbox
                onChange={onChange}
                label={t('modals.worker.fields.admin')}
                value={value}
              />
            )}
          />

          {mode === 'add' && (
            <Button
              title={t('modals.worker.buttons.add')}
              colorScheme="primary"
              loading={loading}
              disabled={!isValid}
              onPress={handleOnAdd}
            />
          )}
          {mode === 'edit' && (
            <Button
              title={t('modals.worker.buttons.save')}
              colorScheme="primary"
              loading={loading}
              disabled={!isValid}
              onPress={handleOnUpdate}
            />
          )}
        </ScrollViewStyle>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default WorkerModal;
