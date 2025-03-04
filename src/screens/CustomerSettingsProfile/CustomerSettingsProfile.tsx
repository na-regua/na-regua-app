import {emitErrorNotification, UserService} from '@/app/api';
import {ICreateCustomerUser} from '@/app/models';
import {AppStatusBar, Box, Button, Input, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AuthThunks, createNotification} from '@/store/slicers';
import {AppDispatch, RootState} from '@/store/Store';
import {phoneMask} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ContainerStyle, ScrollContentStyle} from './styles';

const CustomerSettingsProfile: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/settings/profile'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const {user} = useSelector((state: RootState) => state.auth);

  const {control, formState, watch} = useForm<
    Omit<ICreateCustomerUser, 'phone' | 'email'>
  >({
    defaultValues: {
      name: user?.name,
    },
  });

  const formValues = watch();

  const dispatch = useDispatch<AppDispatch>();

  const hasChangedData = useMemo(() => {
    return formValues.name !== user?.name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  if (!user) {
    return null;
  }

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  const fillStyle: ViewStyle = {
    width: '100%',
  };

  const saveProfile = async () => {
    try {
      const {name} = formValues;

      await UserService.updateUser({name}, user._id);

      await dispatch(AuthThunks.getCurrentUser());

      dispatch(
        createNotification({
          id: 'update-profile',
          type: 'success',
          message: 'notifications.success.updateProfile',
        }),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        emitErrorNotification(error);
      }
    }
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>
      <ScrollContentStyle showsVerticalScrollIndicator={false}>
        <Box gap={6}>
          <Typography variant="h5">
            {'customer.settings.menus.profile.title'}
          </Typography>
          <Typography variant="body2" color="black1">
            {'customer.settings.menus.profile.subtitle'}
          </Typography>
        </Box>
        <Box gap={18} width={'100%'} flex={1}>
          <Controller
            name="name"
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <Input
                label="Nome"
                value={value}
                onChangeText={text => {
                  onChange(text);
                }}
                wrapperStyle={fillStyle}
              />
            )}
          />

          <Input
            label="E-mail"
            value={user?.email}
            editable={false}
            wrapperStyle={fillStyle}
          />

          <Input
            label="Telefone"
            value={phoneMask(user?.phone.toString() || '')}
            editable={false}
            wrapperStyle={fillStyle}
          />
        </Box>
        <Button
          title="buttons.save"
          fillSpace
          disabled={!hasChangedData || !formState.isValid}
          onPress={saveProfile}
        />
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default CustomerSettingsProfile;
