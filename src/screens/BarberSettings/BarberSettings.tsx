import {API_ORIGIN, FilesService} from '@/app/api';
import {Avatar, Icons, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {BottomNav, TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {getCurrentUser, logout} from '@/store/slicers';
import {Colors} from '@/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {ReactNode, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  BarberProfileInfoStyle,
  BarberProfileStyle,
  ContainerStyle,
  ContentStyle,
  HeaderStyle,
  LogoutLinkStyle,
  MenuItemIconStyle,
  MenuItemInfoStyle,
  MenuItemStyle,
  MenuWrapperStyle,
  QRWrapperStyle,
  styles,
} from './styles';

type TSettingsMenuType =
  | 'profile'
  | 'plan'
  | 'custommers'
  | 'workers'
  | 'serviceConfig'
  | 'services';

interface ISettingsMenuItem {
  icon: ReactNode;
  type: TSettingsMenuType;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const BarberSettings: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/settings'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const {barber} = useSelector((state: RootState) => state.auth);

  const [changingAvatar, setChangingAvatar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const menus: ISettingsMenuItem[] = [
    {
      type: 'profile',
      icon: (
        <Icons.UserIcon
          color="default"
          width={24}
          height={24}
          strokeWidth={2}
        />
      ),
      title: 'barber.settings.menus.profile.title',
      subtitle: 'barber.settings.menus.profile.subtitle',
      onPress: () => {},
    },
    {
      type: 'plan',
      icon: <Icons.MoneyIcon width={24} height={24} color="default" />,
      title: 'barber.settings.menus.plan.title',
      subtitle: 'barber.settings.menus.plan.subtitle',
      onPress: () => {},
    },
    {
      type: 'custommers',
      icon: <Icons.UserCheckIcon width={24} height={24} color="default" />,
      title: 'barber.settings.menus.custommers.title',
      subtitle: 'barber.settings.menus.custommers.subtitle',
      onPress: () => {},
    },
    {
      type: 'workers',
      icon: <Icons.UsersIcon width={24} height={24} color="default" />,
      title: 'barber.settings.menus.workers.title',
      subtitle: 'barber.settings.menus.workers.subtitle',
      onPress: () => {
        navigation.navigate('/barber/settings/workers', {
          showContinue: false,
        });
      },
    },
    {
      type: 'services',
      icon: <Icons.MarketIcon width={24} height={24} color="default" />,
      title: 'barber.settings.menus.services.title',
      subtitle: 'barber.settings.menus.services.subtitle',
      onPress: () => {
        navigation.navigate('/barber/settings/services', {
          showContinue: false,
        });
      },
    },
    {
      type: 'serviceConfig',
      icon: <Icons.TimeIcon width={24} height={24} color="default" />,
      title: 'barber.settings.menus.serviceConfig.title',
      subtitle: 'barber.settings.menus.serviceConfig.subtitle',
      onPress: () => {
        navigation.navigate('/barber/settings/services/config');
      },
    },
  ];

  const avatarUrl = useMemo(() => API_ORIGIN + barber?.avatar.url, [barber]);

  if (!barber) {
    return null;
  }

  const onAvatarChange = async (file: Asset) => {
    setChangingAvatar(true);

    try {
      await FilesService.updateBarberAvatarFile(barber.avatar._id, file);

      await dispatch(getCurrentUser());

      setChangingAvatar(false);
    } catch (error) {
      setChangingAvatar(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate('/generic/login');
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
      <Header showTitle={false} showBorder />
      <ContentStyle contentContainerStyle={styles.scrollContainer}>
        <HeaderStyle>
          <Typography variant="h5" color="black3">
            {t('barber.settings.title')}
          </Typography>
          <Typography variant="caption" color="black1">
            {t('barber.settings.subtitle')}
          </Typography>
        </HeaderStyle>
        <BarberProfileStyle>
          <Avatar
            preview={avatarUrl}
            size={88}
            onAvatarChange={onAvatarChange}
            loading={changingAvatar}
          />
          <BarberProfileInfoStyle>
            <Typography variant="h4" color="black3" style={styles.textCenter}>
              {barber.name}
            </Typography>
            <Typography
              variant="caption"
              color="black1"
              style={styles.textCenter}>
              {barber.code}
            </Typography>
          </BarberProfileInfoStyle>
          <QRWrapperStyle activeOpacity={0.8}>
            <Icons.QRIcon color="main" />
          </QRWrapperStyle>
        </BarberProfileStyle>
        <MenuWrapperStyle>
          {menus.map((item, index) => (
            <MenuItemStyle
              key={index}
              onPress={item.onPress}
              activeOpacity={0.6}>
              <MenuItemIconStyle>{item.icon}</MenuItemIconStyle>
              <MenuItemInfoStyle>
                <Typography variant="body1" color="black2">
                  {t(item.title)}
                </Typography>
                <Typography variant="caption" color="black1">
                  {t(item.subtitle)}
                </Typography>
              </MenuItemInfoStyle>
            </MenuItemStyle>
          ))}
          <LogoutLinkStyle onPress={handleLogout} activeOpacity={0.6}>
            <Typography variant="button" color="danger">
              {t('barber.settings.logout')}
            </Typography>
          </LogoutLinkStyle>
        </MenuWrapperStyle>
      </ContentStyle>
      <BottomNav />
    </ContainerStyle>
  );
};

export default BarberSettings;
