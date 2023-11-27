import {GeneralService} from '@/app/api';
import {ICepApiData, ICreateUser} from '@/app/models';
import {
  AppStatusBar,
  Button,
  Icons,
  Input,
  Typography,
} from '@/components/atoms';
import {Header, IAdressFormData} from '@/components/molecules';
import {useKeyboardVisible} from '@/hooks';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {Metrics} from '@/theme';
import {maskCep, numberMask, phoneMask, ufMask} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useCallback, useEffect, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardGroupStyle,
  CardStyle,
  ContainerStyle,
  ContentBackLinkStyle,
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
  const {isKeyboardVisible, keyboardHeight} = useKeyboardVisible();
  const dispatch = useDispatch<AppDispatch>();

  const fieldsRef = {
    name: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
    cep: useRef<TextInput>(null),
    logradouro: useRef<TextInput>(null),
    complemento: useRef<TextInput>(null),
    numero: useRef<TextInput>(null),
    localidade: useRef<TextInput>(null),
    uf: useRef<TextInput>(null),
    bairro: useRef<TextInput>(null),
  };

  const {barber, user} = useSelector((state: RootState) => state.auth);

  const {control: profileControl, setValue: profileSetValue} =
    useForm<ETProfileForm>({
      mode: 'all',
    });

  const {
    control: addressControl,
    setValue: addressSetValue,
    trigger: profileTrigger,
  } = useForm<ETAddressForm>({
    mode: 'all',
  });

  const handlePostalCodeChange = async (text: string) => {
    try {
      const {data} = await GeneralService.getCepData(text);

      const sameKeys: string[] = [
        'localidade',
        'complemento',
        'bairro',
        'uf',
        'logradouro',
      ];

      Object.keys(data).forEach(key => {
        if (sameKeys.includes(key)) {
          addressSetValue(
            key as keyof IAdressFormData,
            data[key as keyof ICepApiData] as string,
          );
        }
      });

      profileTrigger();
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
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const setBarberData = useCallback(() => {
    if (user && barber) {
      if (user.role === 'admin') {
        profileSetValue('name', barber.name);
        profileSetValue('email', barber.email);
        profileSetValue('phone', barber.phone);
      } else if (user.role === 'worker') {
        profileSetValue('name', user.name);
        profileSetValue('email', user.email);
        profileSetValue('phone', user.phone);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBarberData();
  }, [setBarberData]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ContainerStyle style={insetsStyles}>
        <AppStatusBar />
        <Header showTitle={false} showBorder />
        <ContentStyle>
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            keyboardVerticalOffset={Metrics.smPadding}
            style={styles.keyboardAvoidingView}>
            <ScrollContentStyle contentContainerStyle={styles.scrollContainer}>
              <ContentBackLinkStyle onPress={goBack}>
                <Icons.ArrowLeftIcon width={18} color="black1" />
                <Typography variant="button" color="black1">
                  {t('barber.editUser.goBack')}
                </Typography>
              </ContentBackLinkStyle>
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
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label={t('barber.editUser.fields.name')}
                        onChangeText={onChange}
                        onBlur={onBlur}
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
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label={t('barber.editUser.fields.email')}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => {
                          onChange(text);
                        }}
                        onBlur={onBlur}
                        value={value}
                        inputRef={fieldsRef.email}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          fieldsRef.password.current?.focus()
                        }
                        blurOnSubmit={false}
                        textContentType="emailAddress"
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    rules={{required: true}}
                    control={profileControl}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label={t('barber.editUser.fields.phone')}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        onChangeText={text => {
                          const maskedValue = phoneMask(text);
                          onChange(maskedValue);
                        }}
                        onBlur={onBlur}
                        value={value}
                        inputRef={fieldsRef.phone}
                        returnKeyType={'done'}
                        onSubmitEditing={() => {}}
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
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        inputRef={fieldsRef.cep}
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
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label={t('barber.signUp.fields.street')}
                        onChangeText={onChange}
                        onBlur={onBlur}
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
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          label={t('barber.signUp.fields.complement')}
                          wrapperStyle={styles.formRowField}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          inputRef={fieldsRef.complemento}
                          returnKeyType="next"
                          onSubmitEditing={() =>
                            fieldsRef.numero.current?.focus()
                          }
                          blurOnSubmit={false}
                          textContentType="streetAddressLine2"
                        />
                      )}
                    />
                    <Controller
                      name="numero"
                      control={addressControl}
                      rules={{required: true}}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          label={t('barber.signUp.fields.number')}
                          keyboardType="numeric"
                          wrapperStyle={styles.formRowFieldHalf}
                          onChangeText={text => {
                            const maskedText = numberMask(text);
                            onChange(maskedText);
                          }}
                          onBlur={onBlur}
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
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          label={t('barber.signUp.fields.city')}
                          wrapperStyle={styles.formRowField}
                          onChangeText={onChange}
                          onBlur={onBlur}
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
                          inputRef={fieldsRef.localidade}
                          returnKeyType="next"
                          onSubmitEditing={() =>
                            fieldsRef.bairro.current?.focus()
                          }
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
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label={t('barber.signUp.fields.neighborhood')}
                        wrapperStyle={styles.formRowFieldHalf}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        inputRef={fieldsRef.bairro}
                        returnKeyType="done"
                        onSubmitEditing={() => {}}
                        textContentType="sublocality"
                      />
                    )}
                  />
                </CardStyle>
              </CardGroupStyle>
            </ScrollContentStyle>
            {!isKeyboardVisible && (
              <Button title={t('barber.editUser.buttons.save')} />
            )}
          </KeyboardAvoidingView>
        </ContentStyle>
      </ContainerStyle>
    </TouchableWithoutFeedback>
  );
};

export default BarberSettingsProfile;
