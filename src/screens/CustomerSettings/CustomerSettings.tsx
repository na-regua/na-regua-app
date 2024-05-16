import {AppStatusBar, Avatar, Icons, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {ACCESS_TOKEN_KEY, getCurrentUser, logout} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {ReactNode, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Asset} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  ContainerStyle,
  CustomerProfileStyled,
  LogoutLinkStyle,
  MenuItemIconStyle,
  MenuItemInfoStyle,
  MenuItemStyle,
  MenuWrapperStyle,
  ScrollContentStyle,
  styles,
} from './styles';
import {FilesService} from '@/app/api';

type TCustomerSettingsMenuType = 'profile' | 'history';

interface ICustomerSettingsMenuItem {
  icon: ReactNode;
  type: TCustomerSettingsMenuType;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const CustomerSettings: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/settings'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const {user} = useSelector((state: RootState) => state.auth);
  const {userType} = useSelector((state: RootState) => state.login);

  const [changingAvatar, setChangingAvatar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const menus: ICustomerSettingsMenuItem[] = [
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
      title: 'customer.settings.menus.profile.title',
      subtitle: 'customer.settings.menus.profile.subtitle',
      onPress: () => {
        navigation.navigate('/barber/settings/profile');
      },
    },
    {
      type: 'history',
      icon: (
        <Icons.TimeIcon
          color="default"
          width={24}
          height={24}
          strokeWidth={2}
        />
      ),
      title: 'customer.settings.menus.history.title',
      subtitle: 'customer.settings.menus.history.subtitle',
      onPress: () => {
        // navigation.navigate('/barber/settings/profile');
      },
    },
  ];

  const avatarUrl = useMemo(() => user?.avatar.url, [user]);

  if (!user) {
    return null;
  }

  const onAvatarChange = async (_file: Asset) => {
    setChangingAvatar(true);

    try {
      await FilesService.updateUserAvatarFile(user.avatar._id, _file);

      await dispatch(getCurrentUser());

      setChangingAvatar(false);
    } catch (error) {
      setChangingAvatar(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

    dispatch(logout());

    if (userType === 'customer') {
      navigation.navigate('/generic/login/customer');
    }

    if (userType === 'worker') {
      navigation.navigate('/generic/login/barber');
    }
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>
      <ScrollContentStyle
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer]}>
        <CustomerProfileStyled>
          <Avatar
            preview={avatarUrl}
            size={88}
            onAvatarChange={onAvatarChange}
            loading={changingAvatar}
          />
          <Typography variant="h4" color="black3" style={styles.textCenter}>
            {user.name}
          </Typography>
        </CustomerProfileStyled>
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
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default CustomerSettings;
