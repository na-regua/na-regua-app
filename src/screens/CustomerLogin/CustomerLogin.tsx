import {ILoginPhoneFormData} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TUserType, setLoginUserType} from '@/store/slicers';
import {Colors} from '@/theme';
import {phoneMask, phoneRegex} from '@/utils';
import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {SwitchButton, SwitchButtonStyle} from '../Login/styles';
import {
  AvoidingViewStyle,
  ContainerStyle,
  ContentStyle,
  FooterContainerStyle,
  LogoContainerStyle,
} from './styles';

const CustomerLogin = () => {
  const insets = useSafeAreaInsets();
  const {userType} = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();
  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ILoginPhoneFormData>({mode: 'all'});

  const fieldsRef = {
    phone: useRef<TextInput>(null),
  };

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleSwitchUserType = (type: TUserType) => {
    dispatch(setLoginUserType(type));

    if (type === 'worker') {
      navigation.navigate('/generic/login/barber');
    }

    if (type === 'customer') {
      navigation.navigate('/generic/login/customer');
    }
  };

  const doLogin = () => {
    console.log(getValues());
  };

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() => Keyboard.dismiss()}>
      <ContainerStyle style={insetsStyles}>
        <ContentStyle>
          <LogoContainerStyle>
            <Icons.LogoMiniIcon
              svgStyle={{borderRadius: 18, overflow: 'hidden'}}
              disabled
              width={80}
              height={80}
            />
            <Icons.LogoWritingIcon width={220} height={50} />
          </LogoContainerStyle>
          <Typography
            variant="body1"
            color="black1"
            children="generic.login.customer.phoneSubtitle"
            textAlign="justify"
          />

          <AvoidingViewStyle
            enabled
            behavior="padding"
            keyboardVerticalOffset={18}>
            <Controller
              name="phone"
              rules={{required: true, pattern: phoneRegex}}
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  label="generic.login.customer.fields.phone"
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
                  textStyle={{borderColor: Colors.primary}}
                />
              )}
            />
            <Button
              title="generic.login.customer.buttons.send"
              disabled={!isValid}
              onPress={doLogin}
            />
          </AvoidingViewStyle>
        </ContentStyle>
        <FooterContainerStyle>
          <SwitchButton>
            <SwitchButtonStyle
              title="generic.login.buttons.barber"
              colorScheme="primary"
              variant={userType === 'worker' ? 'filled' : 'text'}
              onPress={() => handleSwitchUserType('worker')}
            />
            <SwitchButtonStyle
              title="generic.login.buttons.customer"
              colorScheme="primary"
              variant={userType === 'customer' ? 'filled' : 'text'}
              onPress={() => handleSwitchUserType('customer')}
            />
          </SwitchButton>

          <Button
            title="generic.login.customer.link"
            colorScheme="primary"
            variant="text"
          />
        </FooterContainerStyle>
      </ContainerStyle>
    </TouchableWithoutFeedback>
  );
};

export default CustomerLogin;
