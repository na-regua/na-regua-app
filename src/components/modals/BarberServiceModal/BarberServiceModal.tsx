import {emitErrorNotification, ServicesService} from '@/app/api';
import {IBarberServiceForm} from '@/app/models';
import {Checkbox, Icons, Input, Typography} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {numberMask} from '@/utils';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AxiosError} from 'axios';
import React, {useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {
  ActionsContainerStyle,
  ButtonStyle,
  ScrollViewStyle,
  SelectIconItemStyle,
  SelectIconStyle,
  SelectIconWrapperStyle,
  styles,
} from './styles';

interface IWorkerModalProps {
  modalRef: React.RefObject<BottomSheetModal | null>;
  mode: 'add' | 'edit';
  initialValues?: Partial<IBarberServiceForm>;
  serviceID?: string;
  onClose?: (reloadData?: boolean) => void;
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
      const response = await ServicesService.createService(formValues);

      if (response) {
        if (modalRef.current) {
          setLoading(false);
          modalRef.current.dismiss();
          onClose && onClose(true);
        }
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        emitErrorNotification(error);
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

        const response = await ServicesService.updateService(serviceID, params);

        if (response) {
          if (modalRef.current) {
            setLoading(false);
            modalRef.current.dismiss();
            onClose && onClose(true);
          }
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const hasDiff = useMemo(
    () =>
      formValues.name !== initialValues?.name ||
      formValues.duration_in_minutes !== initialValues?.duration_in_minutes ||
      formValues.price !== initialValues?.price ||
      formValues.icon !== initialValues?.icon ||
      formValues.additional !== initialValues?.additional,
    [formValues, initialValues],
  );

  return (
    <TouchableWithoutFeedback
      style={styles.flex1}
      onPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      }}>
      <ScrollViewStyle
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Controller
          name="name"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              label={t('modals.worker.fields.name')}
              onChangeText={onChange}
              inputRef={fieldsRef.name}
              value={value}
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
          render={({field: {onChange, value}}) => (
            <Input
              label={t('modals.barberService.fields.price')}
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={text => {
                const maskedText = numberMask(text);
                onChange(maskedText);
              }}
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
          name="duration_in_minutes"
          rules={{required: true, min: 0}}
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              label={t('modals.barberService.fields.durationInMinutes')}
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={text => {
                const maskedText = numberMask(text);
                onChange(maskedText);
              }}
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
          name="additional"
          control={control}
          render={({field: {onChange, value}}) => (
            <Checkbox
              label="modals.barberService.fields.additional"
              onChange={v => onChange(v)}
              value={value}
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
                  activeOpacity={0.6}
                  onPress={() => onChange('pente')}
                  active={value === 'pente'}>
                  <Icons.PenteIcon
                    width={24}
                    height={24}
                    color={value === 'pente' ? 'white3' : 'default'}
                  />
                </SelectIconItemStyle>
                <SelectIconItemStyle
                  activeOpacity={0.6}
                  onPress={() => onChange('maquina')}
                  active={value === 'maquina'}>
                  <Icons.MaquinaIcon
                    width={22}
                    height={24}
                    color={value === 'maquina' ? 'white3' : 'default'}
                  />
                </SelectIconItemStyle>
                <SelectIconItemStyle
                  activeOpacity={0.6}
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

        <ActionsContainerStyle>
          {mode === 'add' && (
            <ButtonStyle
              title={t('modals.barberService.buttons.add')}
              colorScheme="primary"
              loading={loading}
              disabled={!formState.isValid}
              onPress={handleOnAdd}
            />
          )}
          {mode === 'edit' && (
            <ButtonStyle
              title={t('modals.barberService.buttons.save')}
              colorScheme="primary"
              loading={loading}
              disabled={!formState.isValid || !hasDiff}
              onPress={handleOnUpdate}
            />
          )}
        </ActionsContainerStyle>
      </ScrollViewStyle>
    </TouchableWithoutFeedback>
  );
};

export default BarberServiceModal;
