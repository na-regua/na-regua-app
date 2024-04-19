import {ILoginMailFormData} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {Colors} from '@/theme';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, TouchableOpacity} from 'react-native';
import {AvoidingViewStyle, ContentStyle, LogoContainerStyle} from './styles';
import {setLoginMethod} from '@/store/slicers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/store/Store';

export interface IBarberLoginMailFormProps {}

const BarberLoginMailForm: React.FC<IBarberLoginMailFormProps> = () => {
  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ILoginMailFormData>({mode: 'all'});
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const fieldsRef = {
    email: useRef<TextInput>(null),
    password: useRef<TextInput>(null),
  };

  const handleShowPassword = () => {
    setShowPassword(curr => !curr);
  };

  const setPhoneLoginMethod = () => {
    dispatch(setLoginMethod('phone'));
  };

  const doLogin = () => {
    console.log(getValues());
  };

  return (
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
        children="generic.login.barber.mailSubtitle"
        textAlign="justify"
      />

      <AvoidingViewStyle enabled behavior="padding" keyboardVerticalOffset={18}>
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={({field: {onChange}}) => (
            <Input
              label="generic.login.barber.fields.email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => {
                onChange(text);
              }}
              inputRef={fieldsRef.email}
              returnKeyType="next"
              onSubmitEditing={() => fieldsRef.password.current?.focus()}
              blurOnSubmit={false}
              textContentType="emailAddress"
              textStyle={{borderColor: Colors.primary}}
            />
          )}
        />

        <Controller
          name="password"
          rules={{required: true, minLength: 5}}
          control={control}
          render={({field: {onChange}}) => (
            <Input
              label="generic.login.barber.fields.password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              suffix={
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleShowPassword}>
                  <Typography variant="button" color="primary">
                    {showPassword ? 'generic.login.hide' : 'generic.login.show'}
                  </Typography>
                </TouchableOpacity>
              }
              inputRef={fieldsRef.password}
              returnKeyType="done"
              onSubmitEditing={() => isValid && doLogin()}
              blurOnSubmit={true}
              textContentType="password"
              textStyle={{borderColor: Colors.primary}}
            />
          )}
        />
        <Button
          title="generic.login.barber.buttons.join"
          disabled={!isValid}
          onPress={doLogin}
        />
      </AvoidingViewStyle>
      <Icons.LinesIcon />
      <Button
        variant="ghost"
        colorScheme="primary"
        title="generic.login.barber.buttons.phoneLogin"
        onPress={setPhoneLoginMethod}
      />
    </ContentStyle>
  );
};

export {BarberLoginMailForm};
