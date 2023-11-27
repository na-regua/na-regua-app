import {TUserRoles} from '@/app/models';
import {Icons, Typography} from '@/components/atoms';
import {RootState} from '@/store/Store';
import {useRoute} from '@react-navigation/native';
import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {APP_ROUTES} from '../appRoutes';
import {
  FloatingContainerStyle,
  NavItem,
  labelStyle,
  shadowStyle,
} from './styles';
import {useAppNavigation} from '../useAppNavigation/useAppNavigation';
import {useTranslation} from 'react-i18next';

interface IBottomNavProps {}

const BottomNav: React.FC<IBottomNavProps> = () => {
  const {t} = useTranslation();
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingBottom: insets.bottom,
  };

  const route = useRoute();
  const navigator = useAppNavigation();

  const isActive = (checkRoute: string) => {
    const currentRoutePrefix = route.name.split('/')[2];
    const checkRoutePrefix = checkRoute.split('/')[2];

    return currentRoutePrefix === checkRoutePrefix;
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleNavigateTo = (routeName: string) => {
    navigator.navigate(routeName);
  };

  const ALL_ROUTES: Record<string, ReactNode> = {
    [APP_ROUTES.BARBER_QUEUE]: (
      <NavItem
        activeOpacity={0.8}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_QUEUE)}>
        <Icons.TimeIcon
          width={27}
          height={26}
          color={isActive(APP_ROUTES.BARBER_QUEUE) ? 'main' : 'default'}
          strokeWidth={isActive(APP_ROUTES.BARBER_QUEUE) ? 1.8 : 1.5}
        />
        <Typography
          variant="tip"
          style={labelStyle}
          color={isActive(APP_ROUTES.BARBER_QUEUE) ? 'main' : 'default'}>
          {t('nav.links.queue')}
        </Typography>
      </NavItem>
    ),
    [APP_ROUTES.BARBER_SCHEDULE]: (
      <NavItem
        activeOpacity={0.8}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_SCHEDULE)}>
        <Icons.ScheduleIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_SCHEDULE) ? 'main' : 'default'}
          strokeWidth={isActive(APP_ROUTES.BARBER_SCHEDULE) ? 1.8 : 1.5}
        />
        <Typography
          variant="tip"
          style={labelStyle}
          color={isActive(APP_ROUTES.BARBER_SCHEDULE) ? 'main' : 'default'}>
          {t('nav.links.schedule')}
        </Typography>
      </NavItem>
    ),
    [APP_ROUTES.BARBER_BILLING]: (
      <NavItem
        activeOpacity={0.8}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_BILLING)}>
        <Icons.MoneyIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_BILLING) ? 'main' : 'default'}
          strokeWidth={isActive(APP_ROUTES.BARBER_BILLING) ? 1.8 : 1.5}
        />
        <Typography
          variant="tip"
          style={labelStyle}
          color={isActive(APP_ROUTES.BARBER_BILLING) ? 'main' : 'default'}>
          {t('nav.links.billing')}
        </Typography>
      </NavItem>
    ),
    [APP_ROUTES.BARBER_SETTINGS]: (
      <NavItem
        activeOpacity={0.8}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_SETTINGS)}>
        <Icons.SettingsIcon
          width={26}
          height={26}
          color={isActive(APP_ROUTES.BARBER_SETTINGS) ? 'main' : 'default'}
          strokeWidth={isActive(APP_ROUTES.BARBER_SETTINGS) ? 1.5 : 1.3}
        />
        <Typography
          variant="tip"
          color={isActive(APP_ROUTES.BARBER_SETTINGS) ? 'main' : 'default'}
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
    custommer: [],
  };

  return (
    <>
      {user && (
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
