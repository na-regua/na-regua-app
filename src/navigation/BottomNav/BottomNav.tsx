import {TUserRoles} from '@/app/models';
import {Icons, Typography} from '@/components/atoms';
import {RootState} from '@/store/Store';
import React, {ReactNode, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {APP_ROUTES} from '../appRoutes';
import {useAppNavigation} from '../useAppNavigation/useAppNavigation';
import {useNavigationContainerRef} from '../useNavigationContainer/useNavigationContainer';
import {
  FloatingContainerStyle,
  NavItem,
  labelStyle,
  shadowStyle,
} from './styles';

interface IBottomNavProps {}

const BottomNav: React.FC<IBottomNavProps> = () => {
  const {t} = useTranslation();
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const insets = useSafeAreaInsets();
  const insetsStyles = {
    marginBottom: insets.bottom,
  };

  const navigator = useAppNavigation();

  const {currentRoute, startUpdateData, stopUpdateData} =
    useNavigationContainerRef();

  const hideBottomNav = useMemo(() => {
    return (currentRoute?.params as any)?.hideBottomNav;
  }, [currentRoute]);

  useEffect(() => {
    startUpdateData();

    return () => {
      stopUpdateData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = (checkRoute: string) => {
    if (!currentRoute) {
      return false;
    }

    const currentRouteSuffix = currentRoute.name.split('/')[2];
    const checkRouteSuffix = checkRoute.split('/')[2];

    return currentRouteSuffix === checkRouteSuffix;
  };

  if (!isAuthenticated) {
    return null;
  }

  if (user?.role === 'customer') {
    return null;
  }

  const handleNavigateTo = (routeName: any) => {
    navigator.navigate(routeName);
  };

  const ALL_ROUTES: Record<string, ReactNode> = {
    [APP_ROUTES.BARBER_QUEUE]: (
      <NavItem
        activeOpacity={0.6}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_QUEUE)}>
        <Icons.TimeTwotoneIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_QUEUE) ? 'main' : 'black1'}
        />
        <Typography
          variant="tip"
          style={labelStyle}
          color={isActive(APP_ROUTES.BARBER_QUEUE) ? 'main' : 'black1'}>
          {t('nav.links.queue')}
        </Typography>
      </NavItem>
    ),
    [APP_ROUTES.BARBER_SCHEDULE]: (
      <NavItem
        activeOpacity={0.6}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_SCHEDULE)}>
        <Icons.ScheduleTwotoneIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_SCHEDULE) ? 'main' : 'black1'}
        />
        <Typography
          variant="tip"
          style={labelStyle}
          color={isActive(APP_ROUTES.BARBER_SCHEDULE) ? 'main' : 'black1'}>
          {t('nav.links.schedule')}
        </Typography>
      </NavItem>
    ),
    [APP_ROUTES.BARBER_BILLING]: (
      <NavItem
        activeOpacity={0.6}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_BILLING)}>
        <Icons.ReceiptIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_BILLING) ? 'main' : 'black1'}
        />
        <Typography
          variant="tip"
          style={labelStyle}
          color={isActive(APP_ROUTES.BARBER_BILLING) ? 'main' : 'black1'}>
          {t('nav.links.billing')}
        </Typography>
      </NavItem>
    ),
    [APP_ROUTES.BARBER_SETTINGS]: (
      <NavItem
        activeOpacity={0.6}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_SETTINGS)}>
        <Icons.SettingsTwotoneIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_SETTINGS) ? 'main' : 'black1'}
        />
        <Typography
          variant="tip"
          color={isActive(APP_ROUTES.BARBER_SETTINGS) ? 'main' : 'black1'}
          style={labelStyle}>
          {t('nav.links.settings')}
        </Typography>
      </NavItem>
    ),
  };

  const routesByRole: Record<TUserRoles, string[]> = {
    admin: [
      APP_ROUTES.BARBER_QUEUE,
      APP_ROUTES.BARBER_SCHEDULE,
      APP_ROUTES.BARBER_BILLING,
      APP_ROUTES.BARBER_SETTINGS,
    ],
    worker: [
      APP_ROUTES.BARBER_QUEUE,
      APP_ROUTES.BARBER_SCHEDULE,
      APP_ROUTES.BARBER_BILLING,
      APP_ROUTES.BARBER_SETTINGS,
    ],
    customer: [],
  };

  return (
    <>
      {user && !hideBottomNav && (
        <FloatingContainerStyle style={[insetsStyles, shadowStyle]}>
          {routesByRole[user.role].map(routeName => (
            <React.Fragment key={routeName}>
              {ALL_ROUTES[routeName]}
            </React.Fragment>
          ))}
        </FloatingContainerStyle>
      )}
    </>
  );
};

export default BottomNav;
