import {AuthService, UserService} from '@/app/api';
import {ICreateCustomerUser} from '@/app/models';
import {Avatar, Button, Input, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {createNotification, setUser} from '@/store/slicers';
import {numberMask, phoneMask, phoneRegex} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, TextInput} from 'react-native';
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
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [avatar, setAvatar] = React.useState<Asset | null>(null);
  const [preview, setPreview] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ICreateCustomerUser>({mode: 'all'});

  const fieldsRef = {
    name: useRef<TextInput>(null),
    phone: useRef<TextInput>(null),
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
      const {name, phone} = getValues();

      const {data} = await UserService.createCustomerUser(
        {
          name,
          phone,
        },
        avatar,
      );

      if (data) {
        await AuthService.sendOTPCode(phone);

        const unmaskedPhone = +numberMask(phone);

        dispatch(setUser(data));

        navigation.navigate('/customer/sign-up/verify', {
          phone: unmaskedPhone,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'customer-signup',
              type: 'error',
              message: `errors.${message}`,
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

    if (!navigation.canGoBack()) {
      navigation.navigate('/generic/login/customer');
    }
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
                  onSubmitEditing={() => {}}
                  blurOnSubmit={true}
                  keyboardType="number-pad"
                  textContentType="telephoneNumber"
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
