import {BarbersService, FilesService} from '@/app/api';
import {
  AppStatusBar,
  Avatar,
  Icons,
  Loader,
  Modal,
  Typography,
} from '@/components/atoms';
import {ShareQRModal} from '@/components/modals';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {StatusBarContext} from '@/providers';
import {AppDispatch, RootState} from '@/store/Store';
import {
  ACCESS_TOKEN_KEY,
  createNotification,
  getCurrentUser,
  logout,
} from '@/store/slicers';
import colors from '@/theme/colors';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {ReactNode, useContext, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Asset} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  BarberButtonStyled,
  BarberProfileInfoStyle,
  BarberProfileStyle,
  ContainerStyle,
  HeaderStyle,
  LogoutLinkStyle,
  MenuItemIconStyle,
  MenuItemInfoStyle,
  MenuItemStyle,
  MenuWrapperStyle,
  QRWrapperStyle,
  ScrollContentStyle,
  styles,
} from './styles';
import {Colors} from '@/theme';

type TSettingsMenuType =
  | 'profile'
  | 'plan'
  | 'custommers'
  | 'workers'
  | 'serviceConfig'
  | 'services'
  | 'permissions';

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

  const {barber, user} = useSelector((state: RootState) => state.auth);
  const {userType} = useSelector((state: RootState) => state.login);

  const [changingAvatar, setChangingAvatar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const shareQRModalRef = useRef<BottomSheetModal>(null);
  const {setStatusbarStyle} = useContext(StatusBarContext);

  const [opening, setOpening] = useState(false);

  const adminMenus: ISettingsMenuItem[] = [
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
      onPress: () => {
        navigation.navigate('/barber/settings/profile');
      },
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
    {
      type: 'permissions',
      icon: (
        <Icons.SettingsIcon
          color="default"
          width={24}
          height={24}
          strokeWidth={1.3}
        />
      ),
      title: 'customer.settings.menus.permissions.title',
      subtitle: 'customer.settings.menus.permissions.subtitle',
      onPress: () => {
        navigation.navigate('/user/permissions');
      },
    },
  ];

  const workerMenus: ISettingsMenuItem[] = [
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
  ];

  const menus: ISettingsMenuItem[] = useMemo(
    () => (user?.role === 'admin' ? adminMenus : workerMenus),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.role],
  );

  const avatarUrl = useMemo(
    () => (barber?.avatar ? barber?.avatar.url : user?.avatar.url),
    [user, barber],
  );

  if (!barber || !user) {
    return null;
  }

  const openShareQRModal = () => {
    if (shareQRModalRef.current) {
      shareQRModalRef.current.present();
      setStatusbarStyle('light-content');
    }
  };

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

  const handleLogout = async () => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY.toString());

    dispatch(logout());

    if (userType === 'customer') {
      navigation.navigate('/generic/login/customer');
    }

    if (userType === 'worker') {
      navigation.navigate('/generic/login/barber');
    }
  };

  const handleOpenBarber = async () => {
    try {
      setOpening(true);

      await BarbersService.setOpen(!barber.open);
      await dispatch(getCurrentUser());

      setOpening(false);
    } catch (error) {
      setOpening(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'set_open',
              message,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.Actions />
        <Header.Border />
      </Header.Container>
      <ScrollContentStyle showsVerticalScrollIndicator={false}>
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
              {user.name}
            </Typography>

            {user.role === 'worker' && (
              <Typography
                variant="body2"
                color="black2"
                style={styles.textCenter}>
                {t('barber.settings.barbershop')}
                <Typography
                  variant="body1"
                  color="black2"
                  style={styles.textCenter}>
                  {barber.name}
                </Typography>
              </Typography>
            )}

            <Typography
              variant="caption"
              color="black1"
              style={styles.textCenter}>
              {t('barber.settings.code')}

              <Typography
                variant="button"
                color="black1"
                style={styles.textCenter}>
                {barber.code}
              </Typography>
            </Typography>
          </BarberProfileInfoStyle>
          <QRWrapperStyle>
            <Icons.QRIcon
              color="main"
              disabled={false}
              onPress={openShareQRModal}
            />
          </QRWrapperStyle>
        </BarberProfileStyle>
        <BarberButtonStyled onPress={handleOpenBarber} open={barber.open}>
          {!opening ? (
            <>
              {barber.open ? (
                <Icons.DeleteIcon
                  width={18}
                  height={18}
                  color="danger"
                  strokeWidth={2}
                />
              ) : (
                <Icons.TimeIcon
                  width={18}
                  height={18}
                  color="success"
                  strokeWidth={2}
                />
              )}
              <Typography variant="button" color="black3">
                {barber.open ? 'buttons.close' : 'buttons.open'}
              </Typography>
            </>
          ) : (
            <Loader
              size="64"
              strokeWidth={3}
              color={barber.open ? Colors.danger : Colors.success}
            />
          )}
        </BarberButtonStyled>

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
      <Modal
        ref={shareQRModalRef}
        snapPoints={['100%']}
        backgroundColor={colors.main}
        onClose={() => setStatusbarStyle('dark-content')}>
        <ShareQRModal modalRef={shareQRModalRef} />
      </Modal>
    </ContainerStyle>
  );
};

export default BarberSettings;
