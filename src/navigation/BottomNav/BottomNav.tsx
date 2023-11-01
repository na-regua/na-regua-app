import {TUserRoles} from '@/app/models';
import {Icons} from '@/components/atoms';
import {RootState} from '@/store/Store';
import {useRoute} from '@react-navigation/native';
import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {APP_ROUTES} from '../appRoutes';
import {FloatingContainerStyle, NavItem, shadowStyle} from './styles';
import {useAppNavigation} from '../useAppNavigation/useAppNavigation';

interface IBottomNavProps {}

const BottomNav: React.FC<IBottomNavProps> = () => {
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingBottom: insets.bottom - 12,
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
        />
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
        />
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
        />
      </NavItem>
    ),
    [APP_ROUTES.BARBER_SETTINGS]: (
      <NavItem
        activeOpacity={0.8}
        onPress={() => handleNavigateTo(APP_ROUTES.BARBER_SETTINGS)}>
        <Icons.SettingsIcon
          width={28}
          height={28}
          color={isActive(APP_ROUTES.BARBER_SETTINGS) ? 'main' : 'default'}
        />
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
    worker: [APP_ROUTES.BARBER_QUEUE, APP_ROUTES.BARBER_SCHEDULE],
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
