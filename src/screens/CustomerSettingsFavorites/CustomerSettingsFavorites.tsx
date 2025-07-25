import {UserService} from '@/app/api';
import {IBarber} from '@/app/models';
import {
  AppStatusBar,
  BarberInfoCard,
  Box,
  Typography,
} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ContainerStyle, ScrollContentStyle} from './styles';

const CustomerSettingsFavorites: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/settings/favorites'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const [favorites, setFavorites] = useState<IBarber[]>([]);

  const {user} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  const fetchBarberFavorites = async () => {
    try {
      const {data} = await UserService.getFavoriteBarbers();

      if (data) {
        setFavorites(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    }
  };

  useEffect(() => {
    fetchBarberFavorites();
  }, []);

  if (!user) {
    return null;
  }

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
            {'customer.settings.menus.favorites.title'}
          </Typography>
          <Typography variant="body2" color="black1">
            {'customer.settings.menus.favorites.subtitle'}
          </Typography>
        </Box>
        <Box gap={18}>
          {favorites.map(barber => (
            <BarberInfoCard
              barber={barber}
              asCard
              key={barber._id}
              showInfo={false}
            />
          ))}
        </Box>
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default CustomerSettingsFavorites;
