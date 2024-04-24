import React, {useMemo} from 'react';

import {
  BarberBillingScreen,
  BarberCompletedQrScreen,
  BarberLoginScreen,
  BarberPreSignUpScreen,
  BarberQueueScreen,
  BarberScheduleScreen,
  BarberServicesConfigScreen,
  BarberServicesScreen,
  BarberSettingsProfileScreen,
  BarberSettingsScreen,
  BarberSignUpScreen,
  CustomerLoginScreen,
  LoginScreen,
  SplashScreen,
} from '@/screens';
import BarberWorkers from '@/screens/BarberWorkers/BarberWorkers';
import {RootState} from '@/store/Store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import BottomNav from '../BottomNav/BottomNav';
import {TRootStackParamList} from '../appRoutes';
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
      }
    }

    return routeName;
  }, [isAuthenticated, user, barber]);

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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName as any}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'/barber/sign-up'} component={BarberSignUpScreen} />
        <Stack.Screen
          name={'/barber/pre-sign-up'}
          component={BarberPreSignUpScreen}
        />

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

        {WorkerAuth && (
          <>
            <Stack.Screen
              name={'/barber/queue'}
              component={BarberQueueScreen}
              options={{animation: 'none'}}
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
