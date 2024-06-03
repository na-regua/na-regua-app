import {ICreateCustomerUser} from '@/app/models';
import {AppStatusBar, Box, Button, Input, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {phoneMask} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
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

  const [profileData, setProfileData] = useState<Partial<ICreateCustomerUser>>({
    name: user?.name,
    phone: user?.phone ? phoneMask(user?.phone.toString()) : '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const hasChangedData = useMemo(() => {
    const maskedPhone = user?.phone ? phoneMask(user?.phone.toString()) : '';

    return profileData.name !== user?.name || profileData.phone !== maskedPhone;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData.name, profileData.phone]);

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
          <Input
            label="Nome"
            value={profileData.name}
            onChangeText={text => {
              setProfileData({...profileData, name: text});
            }}
            wrapperStyle={fillStyle}
          />
          <Input
            label="Telefone"
            value={profileData.phone}
            onChangeText={text => {
              setProfileData({...profileData, phone: phoneMask(text)});
            }}
            wrapperStyle={fillStyle}
          />
        </Box>
        <Button title="buttons.save" fillSpace disabled={!hasChangedData} />
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default CustomerSettingsProfile;
