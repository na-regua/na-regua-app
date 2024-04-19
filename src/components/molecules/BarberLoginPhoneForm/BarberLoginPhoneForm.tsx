import {ILoginPhoneFormData} from '@/app/models';
import {Button, Icons, Input, Typography} from '@/components/atoms';
import {Colors} from '@/theme';
import {phoneMask, phoneRegex} from '@/utils';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import {AvoidingViewStyle, ContentStyle, LogoContainerStyle} from './styles';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/store/Store';
import {setLoginMethod} from '@/store/slicers';

const BarberLoginPhoneForm = () => {
  const {
    control,
    formState: {isValid},
    getValues,
  } = useForm<ILoginPhoneFormData>({mode: 'all'});
  const dispatch = useDispatch<AppDispatch>();
  
  const [isVerifying, setIsVerifying] = useState(false);

  const fieldsRef = {
    phone: useRef<TextInput>(null),
  };

  const setLoginMailMethod = () => {
    dispatch(setLoginMethod('e-mail'));
  };

  const sendCode = () => {
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
        children="generic.login.barber.phoneSubtitle"
        textAlign="justify"
      />

      <AvoidingViewStyle enabled behavior="padding" keyboardVerticalOffset={18}>
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
          title="generic.login.barber.buttons.send"
          disabled={!isValid}
          onPress={sendCode}
        />
      </AvoidingViewStyle>
      <Icons.LinesIcon />
      <Button
        variant="ghost"
        colorScheme="primary"
        title="generic.login.barber.buttons.mailLogin"
        onPress={setLoginMailMethod}
      />
    </ContentStyle>
  );
};

export {BarberLoginPhoneForm};
