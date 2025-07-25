import {UserService} from '@/app/api';
import {ICreateCustomerUser} from '@/app/models';
import {Avatar, Button, Input, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {AuthThunks, setUser} from '@/store/slicers';
import {phoneMask, phoneRegex} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, TextInput, TouchableOpacity} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {
  CSUAvatarWrapperStyled,
  CSUContainerStyled,
  CSUContentFormStyled,
  CSUContentStyled,
  CSUHeaderStyled,
  CSUNoFeedbackStyled,
} from './styles';

const CustomerSignUp: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/sign-up'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [avatar, setAvatar] = useState<Asset | null>(null);
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ICreateCustomerUser>({mode: 'all'});

  const fieldsRef = {
    name: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
  };

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const onAvatarChange = (file: Asset) => {
    if (file.base64) {
      setPreview(`data:image/jpeg;base64,${file.base64}`);
    }
    setAvatar(file);

    fieldsRef.name.current?.focus();
  };

  const signUpCustomer = async () => {
    if (!avatar) {
      return;
    }

    setLoading(true);

    try {
      const {name, phone, email, password} = getValues();

      const {data} = await UserService.createCustomerUser(
        {
          name,
          phone,
          email,
          password,
        },
        avatar,
      );

      if (data) {
        dispatch(setUser(data.user));
        dispatch(AuthThunks.setPersistedToken(data.access_token));

        navigation.navigate('/customer/home');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    navigation.navigate('/generic/login/customer');
  };

  return (
    <CSUNoFeedbackStyled
      onPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      }}>
      <CSUContainerStyled style={insetsStyles}>
        <Header.Container>
          <Header.GoBack pressables={{back: goBack}} />
          <Header.Border />
        </Header.Container>
        <CSUContentStyled>
          <CSUHeaderStyled>
            <Typography variant="h2" color="black3">
              {'customer.signUp.title'}
            </Typography>
            <Typography variant="body2" color="black1">
              {'customer.signUp.subtitle'}
            </Typography>
          </CSUHeaderStyled>
          <CSUAvatarWrapperStyled>
            <Avatar
              preview={preview}
              onAvatarChange={onAvatarChange}
              size={90}
            />
            <Typography variant="body2" color="black1">
              {'customer.signUp.fields.avatar'}
            </Typography>
          </CSUAvatarWrapperStyled>
          <CSUContentFormStyled>
            <Controller
              name="name"
              rules={{required: true}}
              control={control}
              render={({field: {onChange}}) => (
                <Input
                  label="customer.signUp.fields.name"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  inputRef={fieldsRef.name}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    fieldsRef.phone.current?.focus();
                  }}
                  textContentType="name"
                />
              )}
            />
            <Controller
              name="phone"
              rules={{required: true, pattern: phoneRegex}}
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  label="customer.signUp.fields.phone"
                  autoCapitalize="none"
                  onChangeText={text => {
                    const maskedValue = phoneMask(text);
                    onChange(maskedValue);
                  }}
                  value={value}
                  inputRef={fieldsRef.phone}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    fieldsRef.email.current?.focus();
                  }}
                  blurOnSubmit={true}
                  keyboardType="number-pad"
                  textContentType="telephoneNumber"
                />
              )}
            />

            <Controller
              name="email"
              rules={{required: true}}
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  label={t('modals.worker.fields.email')}
                  autoCapitalize="none"
                  value={value}
                  keyboardType="email-address"
                  onChangeText={text => {
                    onChange(text);
                  }}
                  inputRef={fieldsRef.email}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    fieldsRef.password.current?.focus();
                  }}
                  blurOnSubmit={false}
                  textContentType="emailAddress"
                />
              )}
            />

            <Controller
              name="password"
              rules={{required: true, minLength: 5}}
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  label="generic.login.barber.fields.password"
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  value={value}
                  suffix={
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={handleShowPassword}>
                      <Typography variant="button" color="primary">
                        {showPassword
                          ? 'generic.login.hide'
                          : 'generic.login.show'}
                      </Typography>
                    </TouchableOpacity>
                  }
                  inputRef={fieldsRef.password}
                  returnKeyType="done"
                  onSubmitEditing={() => isValid && signUpCustomer()}
                  blurOnSubmit={true}
                />
              )}
            />
          </CSUContentFormStyled>

          <Button
            title="customer.signUp.buttons.continue"
            disabled={!isValid || !avatar}
            loading={loading}
            onPress={signUpCustomer}
          />
        </CSUContentStyled>
      </CSUContainerStyled>
    </CSUNoFeedbackStyled>
  );
};

export default CustomerSignUp;
