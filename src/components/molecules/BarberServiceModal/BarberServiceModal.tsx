import {BarberServicesService} from '@/app/api';
import {IBarberServiceIcon} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {numberMask} from '@/utils';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AxiosError} from 'axios';
import React, {useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {
  ScrollViewStyle,
  SelectIconItemStyle,
  SelectIconStyle,
  SelectIconWrapperStyle,
  styles,
} from './styles';

export interface IBarberServiceForm {
  name: string;
  durationInMinutes: string;
  price: string;
  icon: IBarberServiceIcon;
}

interface IWorkerModalProps {
  modalRef: React.RefObject<BottomSheetModal | null>;
  onClose?: () => void;
  mode: 'add' | 'edit';
  initialValues?: Partial<IBarberServiceForm>;
  serviceID?: string;
}

const BarberServiceModal: React.FC<IWorkerModalProps> = ({
  initialValues,
  modalRef,
  mode,
  serviceID,
  onClose,
}) => {
  const defaultValues =
    mode === 'edit'
      ? initialValues
      : ({icon: 'pente'} as Partial<IBarberServiceForm>);

  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {control, watch, formState} = useForm<IBarberServiceForm>({
    mode: 'all',
    defaultValues,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const formValues = watch();

  const fieldsRef = {
    name: useRef<TextInput>(null),
    price: useRef<TextInput>(null),
    durationInMinutes: useRef<TextInput>(null),
  };

  const handleOnAdd = async () => {
    setLoading(true);

    try {
      const response = await BarberServicesService.createService(formValues);

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
  };

  const handleOnUpdate = async () => {
    if (serviceID) {
      setLoading(true);

      try {
        const params: Partial<IBarberServiceForm> = {
          ...formValues,
        };

        const response = await BarberServicesService.updateService(
          serviceID,
          params,
        );

        if (response) {
          if (modalRef.current) {
            modalRef.current.close();
            onClose && onClose();

            setLoading(false);
          }
        }
      } catch (error) {
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

        setLoading(false);
      }
    }
  };

  const hasDiff = useMemo(
    () =>
      formValues.name !== initialValues?.name ||
      formValues.durationInMinutes !== initialValues?.durationInMinutes ||
      formValues.price !== initialValues?.price ||
      formValues.icon !== initialValues?.icon,
    [formValues, initialValues],
  );

  return (
    <TouchableWithoutFeedback
      style={styles.flex1}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        enabled
        style={styles.flex1}
        behavior="padding"
        keyboardVerticalOffset={48}>
        <ScrollViewStyle
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
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
                onSubmitEditing={() => fieldsRef.price.current?.focus()}
                blurOnSubmit={false}
              />
            )}
          />
          <Controller
            name="price"
            rules={{required: true, min: 0}}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('modals.barberService.fields.price')}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={text => {
                  const maskedText = numberMask(text);
                  onChange(maskedText);
                }}
                onBlur={onBlur}
                value={value}
                suffix={
                  <Typography variant="button" color="placeholder">
                    {t('units.money')}
                  </Typography>
                }
                inputRef={fieldsRef.price}
                returnKeyType="done"
                onSubmitEditing={() =>
                  fieldsRef.durationInMinutes.current?.focus()
                }
                blurOnSubmit={false}
              />
            )}
          />
          <Controller
            name="durationInMinutes"
            rules={{required: true, min: 0}}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={t('modals.barberService.fields.durationInMinutes')}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={text => {
                  const maskedText = numberMask(text);
                  onChange(maskedText);
                }}
                onBlur={onBlur}
                value={value}
                suffix={
                  <Typography variant="button" color="placeholder">
                    {t('units.minutes')}
                  </Typography>
                }
                inputRef={fieldsRef.durationInMinutes}
                returnKeyType="done"
                onSubmitEditing={() =>
                  fieldsRef.durationInMinutes.current?.blur()
                }
              />
            )}
          />

          <Controller
            name="icon"
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <SelectIconStyle>
                <Typography variant="caption" color="placeholder">
                  {t('modals.barberService.fields.selectIcon')}
                </Typography>
                <SelectIconWrapperStyle>
                  <SelectIconItemStyle
                    activeOpacity={0.8}
                    onPress={() => onChange('pente')}
                    active={value === 'pente'}>
                    <Icons.PenteIcon
                      width={24}
                      height={24}
                      color={value === 'pente' ? 'white3' : 'default'}
                    />
                  </SelectIconItemStyle>
                  <SelectIconItemStyle
                    activeOpacity={0.8}
                    onPress={() => onChange('maquina')}
                    active={value === 'maquina'}>
                    <Icons.MaquinaIcon
                      width={22}
                      height={24}
                      color={value === 'maquina' ? 'white3' : 'default'}
                    />
                  </SelectIconItemStyle>
                  <SelectIconItemStyle
                    activeOpacity={0.8}
                    onPress={() => onChange('navalha')}
                    active={value === 'navalha'}>
                    <Icons.NavalhaIcon
                      width={28}
                      height={18}
                      color={value === 'navalha' ? 'white3' : 'default'}
                    />
                  </SelectIconItemStyle>
                </SelectIconWrapperStyle>
              </SelectIconStyle>
            )}
          />

          {mode === 'add' && (
            <Button
              title={t('modals.barberService.buttons.add')}
              colorScheme="primary"
              loading={loading}
              disabled={!formState.isValid}
              onPress={handleOnAdd}
            />
          )}
          {mode === 'edit' && (
            <Button
              title={t('modals.barberService.buttons.save')}
              colorScheme="primary"
              loading={loading}
              disabled={!formState.isValid || !hasDiff}
              onPress={handleOnUpdate}
            />
          )}
        </ScrollViewStyle>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default BarberServiceModal;
