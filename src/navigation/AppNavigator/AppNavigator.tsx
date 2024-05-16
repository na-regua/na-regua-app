import React, {useMemo} from 'react';

import {
  BarberBillingScreen,
  BarberCompletedQrScreen,
  BarberLoginScreen,
  BarberOnQueueScreen,
  BarberQueueScreen,
  BarberScheduleScreen,
  BarberServicesConfigScreen,
  BarberServicesScreen,
  BarberSettingsProfileScreen,
  BarberSettingsScreen,
  BarberSignUpScreen,
  CustomerCutScreen,
  CustomerHomeScreen,
  CustomerLoginScreen,
  CustomerOnTicketScreen,
  CustomerQrScannerScreen,
  CustomerSettingsScreen,
  CustomerSignUpScreen,
  CustomerSignUpVerifyScreen,
  LoginScreen,
  NotificationsScreen,
  SplashScreen,
} from '@/screens';
import BarberWorkers from '@/screens/BarberWorkers/BarberWorkers';
import {RootState} from '@/store/Store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import BottomNav from '../BottomNav/BottomNav';
import {LinkingConfig, TRootStackParamList} from '../appRoutes';
import {navigationRef} from '../useNavigationContainer/useNavigationContainer';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppNavigator: React.FC = () => {
  const {isLoading, isAuthenticated, user, barber} = useSelector(
    (state: RootState) => state.auth,
  );

  const initialRouteName = useMemo(() => {
    let routeName = '';

    if (!isAuthenticated) {
      routeName = '/generic/login';
    }

    if (user) {
      if (barber && (user.role === 'admin' || user.role === 'worker')) {
        routeName = '/barber/queue';

        if (barber.profileStatus === 'pre') {
          routeName = '/barber/settings/workers';
        }
      }

      if (user.role === 'customer') {
        routeName = '/customer/home';
      }
    }

    return routeName;
  }, [isAuthenticated, user, barber]);

  const CustomerAuth = useMemo(
    () => user && isAuthenticated && user.role === 'customer',
    [isAuthenticated, user],
  );

  const WorkerAuth = useMemo(
    () =>
      user &&
      isAuthenticated &&
      (user.role === 'worker' || user.role === 'admin'),
    [isAuthenticated, user],
  );

  const AdminAuth = useMemo(
    () => user && isAuthenticated && user.role === 'admin',
    [isAuthenticated, user],
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef} linking={LinkingConfig}>
      <Stack.Navigator
        initialRouteName={initialRouteName as any}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'/barber/sign-up'} component={BarberSignUpScreen} />

        <Stack.Screen
          name={'/generic/login'}
          component={LoginScreen}
          options={{animation: 'none'}}
        />
        <Stack.Screen
          name={'/generic/login/barber'}
          component={BarberLoginScreen}
          options={{animation: 'none'}}
        />
        <Stack.Screen
          name={'/generic/login/customer'}
          component={CustomerLoginScreen}
          options={{animation: 'none'}}
        />
        <Stack.Screen
          name={'/customer/sign-up'}
          component={CustomerSignUpScreen}
        />
        <Stack.Screen
          name={'/customer/sign-up/verify'}
          component={CustomerSignUpVerifyScreen}
        />

        {isAuthenticated && (
          <>
            <Stack.Screen
              name={'/user/notifications'}
              component={NotificationsScreen}
              options={{
                animation: 'simple_push',
                animationDuration: 200,
              }}
              initialParams={{hideBottomNav: true}}
            />
          </>
        )}

        {CustomerAuth && (
          <>
            <Stack.Screen
              name={'/customer/home'}
              component={CustomerHomeScreen}
            />
            <Stack.Screen
              name={'/customer/settings'}
              component={CustomerSettingsScreen}
            />
            <Stack.Screen
              name={'/customer/cut'}
              component={CustomerCutScreen}
            />
            <Stack.Screen
              name={'/customer/qr-scanner'}
              component={CustomerQrScannerScreen}
            />
            <Stack.Screen
              name={'/customer/on-ticket'}
              component={CustomerOnTicketScreen}
              initialParams={{hideBottomNav: true}}
            />
          </>
        )}

        {WorkerAuth && (
          <>
            <Stack.Screen
              name={'/barber/queue'}
              component={BarberQueueScreen}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name={'/barber/queue/fs'}
              component={BarberOnQueueScreen}
            />
            <Stack.Screen
              name={'/barber/schedule'}
              component={BarberScheduleScreen}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name={'/barber/billing'}
              component={BarberBillingScreen}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name={'/barber/settings'}
              component={BarberSettingsScreen}
              options={{animation: 'none'}}
            />
            <Stack.Screen
              name={'/barber/settings/profile'}
              component={BarberSettingsProfileScreen}
              initialParams={{hideBottomNav: true}}
            />
          </>
        )}

        {AdminAuth && (
          <>
            <Stack.Screen
              name={'/barber/settings/workers'}
              component={BarberWorkers}
              initialParams={{showContinue: true, hideBottomNav: true}}
            />
            <Stack.Screen
              name={'/barber/settings/services'}
              component={BarberServicesScreen}
              initialParams={{showContinue: true, hideBottomNav: true}}
            />
            <Stack.Screen
              name={'/barber/complete-qr'}
              component={BarberCompletedQrScreen}
              initialParams={{hideBottomNav: true}}
            />
            <Stack.Screen
              name={'/barber/settings/services/config'}
              component={BarberServicesConfigScreen}
              initialParams={{hideBottomNav: true}}
            />
          </>
        )}
      </Stack.Navigator>

      <BottomNav />
    </NavigationContainer>
  );
};

export default AppNavigator;
