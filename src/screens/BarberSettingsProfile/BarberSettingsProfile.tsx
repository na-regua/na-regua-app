import {BarbersService, GeneralService, UserService} from '@/app/api';
import {
  IAdressFormData,
  IBarberUpdate,
  ICepApiData,
  ICreateUser,
} from '@/app/models';
import {AppStatusBar, Button, Input, Typography} from '@/components/atoms';
import {Header, UpdateBarberThumbs} from '@/components/molecules';
import {useKeyboardVisible} from '@/hooks';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {AuthThunks} from '@/store/slicers';
import {checkDiff, maskCep, numberMask, phoneMask, ufMask} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardGroupStyle,
  CardStyle,
  ContainerStyle,
  ContentHeaderStyle,
  ContentStyle,
  FormRow,
  ScrollContentStyle,
  styles,
} from './styles';

type ETProfileForm = Omit<ICreateUser, 'password'>;

type ETAddressForm = IAdressFormData;

const BarberSettingsProfile: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/settings/profile'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const {isKeyboardVisible} = useKeyboardVisible();
  const dispatch = useDispatch<AppDispatch>();
  const [saving, setSaving] = useState(false);

  const fieldsRef = {
    name: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
    cep: useRef<TextInput>(null),
    logradouro: useRef<TextInput>(null),
    complemento: useRef<TextInput>(null),
    numero: useRef<TextInput>(null),
    localidade: useRef<TextInput>(null),
    uf: useRef<TextInput>(null),
    bairro: useRef<TextInput>(null),
  };

  const {barber, user} = useSelector((state: RootState) => state.auth);

  const isAdmin = user?.role === 'admin';

  const {
    control: profileControl,
    setValue: profileSetValue,
    watch: profileWatch,
    formState: {isValid: isProfileValid},
  } = useForm<ETProfileForm>({
    mode: 'all',
  });

  const {
    control: addressControl,
    setValue: addressSetValue,
    watch: addressWatch,
    formState: {isValid: isAddressValid},
  } = useForm<ETAddressForm>({
    mode: 'all',
  });

  let watchProfile = profileWatch();
  let watchAddress = addressWatch();

  const handlePostalCodeChange = async (text: string) => {
    const removeMasktext = text.replace(/\D/g, '');

    if (removeMasktext.length >= 8) {
      try {
        const {data} = await GeneralService.getCepData(removeMasktext);

        const sameKeys: string[] = [
          'localidade',
          'complemento',
          'bairro',
          'uf',
          'logradouro',
        ];

        addressSetValue('numero', '');

        Object.keys(data).forEach(key => {
          if (sameKeys.includes(key)) {
            addressSetValue(
              key as keyof IAdressFormData,
              data[key as keyof ICepApiData] as string,
            );
          }
        });
      } catch (error) {}
    }
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/barber/settings');
    }
  };

  const setBarberData = useCallback(() => {
    if (user && barber) {
      if (barber.address) {
        const address: ETAddressForm = {
          cep: barber.address.cep,
          logradouro: barber.address.street,
          complemento: barber.address.complement || '',
          numero: barber.address.number.toString(),
          localidade: barber.address.city,
          uf: barber.address.uf,
          bairro: barber.address.neighborhood,
        };

        Object.keys(address).forEach(key => {
          addressSetValue(
            key as keyof ETAddressForm,
            address[key as keyof ETAddressForm],
          );
        });
      }

      let profileData: ETProfileForm = {
        name: barber.name,
        email: barber.email,
        phone: phoneMask(barber.phone.toString()),
      };

      if (!isAdmin) {
        profileData = {
          name: user.name,
          email: user.email,
          phone: phoneMask(user.phone.toString()),
        };
      }

      Object.keys(profileData).forEach(key => {
        profileSetValue(
          key as keyof ETProfileForm,
          profileData[key as keyof ETProfileForm],
        );
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barber, user]);

  const hasUserChanged = useMemo(() => {
    if (barber && user) {
      let compareArr: ETProfileForm = {
        name: barber.name,
        email: barber.email,
        phone: phoneMask(barber.phone.toString()),
      };

      if (!isAdmin) {
        compareArr = {
          name: user.name,
          email: user.email,
          phone: phoneMask(user.phone.toString()),
        };
      }

      return checkDiff(watchProfile, compareArr);
    }

    return false;
  }, [barber, isAdmin, user, watchProfile]);

  const hasAddressChanged = useMemo(() => {
    if (barber && barber.address) {
      const compareArr: ETAddressForm = {
        cep: barber.address.cep,
        logradouro: barber.address.street,
        complemento: barber.address.complement || '',
        numero: barber.address.number.toString(),
        localidade: barber.address.city,
        uf: barber.address.uf,
        bairro: barber.address.neighborhood,
      };

      return checkDiff(watchAddress, compareArr);
    }

    return false;
  }, [barber, watchAddress]);

  const canUpdate = useMemo(
    () =>
      (hasUserChanged && isProfileValid) ||
      (hasAddressChanged && isAddressValid),
    [hasUserChanged, hasAddressChanged, isAddressValid, isProfileValid],
  );

  useEffect(() => {
    setBarberData();
  }, [setBarberData]);

  if (!user || !barber) {
    return null;
  }

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const saveProfile = async () => {
    setSaving(true);

    try {
      const payload: IBarberUpdate = {};

      const unmaskedPhone = watchProfile.phone.replace(/\D/g, '');

      const profileData: ETProfileForm = {
        name: watchProfile.name,
        email: watchProfile.email,
        phone: unmaskedPhone,
      };

      if (hasAddressChanged) {
        payload.addressData = {
          cep: watchAddress.cep,
          street: watchAddress.logradouro,
          complement: watchAddress.complemento,
          number: Number(watchAddress.numero),
          city: watchAddress.localidade,
          uf: watchAddress.uf,
          neighborhood: watchAddress.bairro,
        };
      }

      if (hasUserChanged) {
        await UserService.updateUser(profileData, user._id);

        if (isAdmin) {
          payload.profileData = profileData;
        }
      }

      if (hasAddressChanged || hasUserChanged) {
        await BarbersService.update(payload);
      }

      if (canUpdate) {
        await dispatch(AuthThunks.getCurrentUser());
      }

      setSaving(false);
    } catch (error) {
      setSaving(false);
    }
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>

      <ContentStyle>
        <ScrollContentStyle
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <ContentHeaderStyle>
            <Typography variant="h5" color="black3">
              {t('barber.editUser.title')}
            </Typography>
            <Typography variant="body2" color="black1">
              {t('barber.editUser.subtitle')}
            </Typography>
          </ContentHeaderStyle>
          <CardGroupStyle>
            <Typography variant="body1" color="black2">
              {t('barber.editUser.sections.profile')}
            </Typography>
            <CardStyle>
              <Controller
                name="name"
                control={profileControl}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    label={t('barber.editUser.fields.name')}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    inputRef={fieldsRef.name}
                    onSubmitEditing={() => fieldsRef.email.current?.focus()}
                    blurOnSubmit={false}
                    textContentType="name"
                  />
                )}
              />

              <Controller
                name="email"
                rules={{required: true}}
                control={profileControl}
                render={({field: {onChange, value}}) => (
                  <Input
                    label={t('barber.editUser.fields.email')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={text => {
                      onChange(text);
                    }}
                    value={value}
                    inputRef={fieldsRef.email}
                    returnKeyType="next"
                    onSubmitEditing={() => fieldsRef.phone.current?.focus()}
                    blurOnSubmit={false}
                    textContentType="emailAddress"
                  />
                )}
              />

              <Controller
                name="phone"
                rules={{required: true}}
                control={profileControl}
                render={({field: {onChange, value}}) => (
                  <Input
                    label={t('barber.editUser.fields.phone')}
                    autoCapitalize="none"
                    onChangeText={text => {
                      const maskedValue = phoneMask(text);
                      onChange(maskedValue);
                    }}
                    value={value}
                    inputRef={fieldsRef.phone}
                    returnKeyType={'done'}
                    keyboardType="number-pad"
                    onSubmitEditing={() => fieldsRef.cep.current?.focus()}
                    textContentType="telephoneNumber"
                  />
                )}
              />
            </CardStyle>
          </CardGroupStyle>

          <CardGroupStyle>
            <Typography variant="body1" color="black2">
              {t('barber.editUser.sections.address')}
            </Typography>
            <CardStyle>
              <Controller
                name="cep"
                control={addressControl}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    inputRef={fieldsRef.cep}
                    label={t('barber.signUp.fields.postalCode')}
                    keyboardType="numeric"
                    onChangeText={text => {
                      const maskedText = maskCep(text);
                      handlePostalCodeChange(maskedText);
                      onChange(maskedText);
                    }}
                    value={value}
                    returnKeyType="done"
                    onSubmitEditing={() =>
                      fieldsRef.logradouro.current?.focus()
                    }
                    blurOnSubmit={false}
                    textContentType="postalCode"
                  />
                )}
              />
              <Controller
                name="logradouro"
                control={addressControl}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    label={t('barber.signUp.fields.street')}
                    onChangeText={onChange}
                    value={value}
                    inputRef={fieldsRef.logradouro}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      fieldsRef.complemento.current?.focus()
                    }
                    blurOnSubmit={false}
                    textContentType="fullStreetAddress"
                  />
                )}
              />
              <FormRow>
                <Controller
                  name="complemento"
                  control={addressControl}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label={t('barber.signUp.fields.complement')}
                      wrapperStyle={styles.formRowField}
                      onChangeText={onChange}
                      value={value}
                      inputRef={fieldsRef.complemento}
                      returnKeyType="next"
                      onSubmitEditing={() => fieldsRef.numero.current?.focus()}
                      blurOnSubmit={false}
                      textContentType="streetAddressLine2"
                    />
                  )}
                />
                <Controller
                  name="numero"
                  control={addressControl}
                  rules={{required: true}}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label={t('barber.signUp.fields.number')}
                      keyboardType="numeric"
                      wrapperStyle={styles.formRowFieldHalf}
                      onChangeText={text => {
                        const maskedText = numberMask(text);
                        onChange(maskedText);
                      }}
                      value={value}
                      inputRef={fieldsRef.numero}
                      returnKeyType="done"
                      onSubmitEditing={() =>
                        fieldsRef.localidade.current?.focus()
                      }
                      blurOnSubmit={false}
                      textContentType="streetAddressLine2"
                    />
                  )}
                />
              </FormRow>
              <FormRow>
                <Controller
                  name="localidade"
                  control={addressControl}
                  rules={{required: true}}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label={t('barber.signUp.fields.city')}
                      wrapperStyle={styles.formRowField}
                      onChangeText={onChange}
                      value={value}
                      inputRef={fieldsRef.localidade}
                      returnKeyType="next"
                      onSubmitEditing={() => fieldsRef.uf.current?.focus()}
                      blurOnSubmit={false}
                      textContentType="addressCity"
                    />
                  )}
                />
                <Controller
                  name="uf"
                  control={addressControl}
                  rules={{required: true}}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label={t('barber.signUp.fields.uf')}
                      wrapperStyle={styles.formRowFieldHalf}
                      onChangeText={text => {
                        const maskedText = ufMask(text);
                        onChange(maskedText);
                      }}
                      value={value}
                      inputRef={fieldsRef.uf}
                      returnKeyType="next"
                      onSubmitEditing={() => fieldsRef.bairro.current?.focus()}
                      blurOnSubmit={false}
                      textContentType="addressState"
                    />
                  )}
                />
              </FormRow>
              <Controller
                name="bairro"
                control={addressControl}
                rules={{required: true}}
                render={({field: {onChange, value}}) => (
                  <Input
                    label={t('barber.signUp.fields.neighborhood')}
                    wrapperStyle={styles.formRowFieldHalf}
                    onChangeText={onChange}
                    value={value}
                    inputRef={fieldsRef.bairro}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      if (canUpdate) {
                        saveProfile();
                      }
                    }}
                    textContentType="sublocality"
                  />
                )}
              />
            </CardStyle>
          </CardGroupStyle>
          <UpdateBarberThumbs />
        </ScrollContentStyle>
        {!isKeyboardVisible && (
          <Button
            disabled={!canUpdate}
            onPress={saveProfile}
            loading={saving}
            colorScheme="primary"
            title={t('barber.editUser.buttons.save')}
          />
        )}
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberSettingsProfile;
