import React, {useMemo} from 'react';

import {
  BarberBillingScreen,
  BarberCompletedQrScreen,
  BarberPreSignUpScreen,
  BarberQueueScreen,
  BarberScheduleScreen,
  BarberServicesScreen,
  BarberSettingsScreen,
  BarberSignUpScreen,
  LoginScreen,
  SplashScreen,
  VerifyPhoneScreen,
} from '@/screens';
import BarberWorkers from '@/screens/BarberWorkers/BarberWorkers';
import {RootState} from '@/store/Store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {APP_ROUTES} from '../appRoutes';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const {isLoading, isAuthenticated, user, barber} = useSelector(
    (state: RootState) => state.auth,
  );

  const skipPreSignUp = useSelector((state: RootState) => state.config.skipPre);

  const initialRouteName = useMemo(() => {
    if (!isAuthenticated) {
      return APP_ROUTES.GENERIC_LOGIN;
    }

    if (user) {
      if (barber && (user.role === 'admin' || user.role === 'worker')) {
        if (barber.profileStatus !== 'completed' && !skipPreSignUp) {
          return APP_ROUTES.BARBER_PRE_SIGN_UP;
        }

        return APP_ROUTES.BARBER_QUEUE;
      } else if (user.role === 'custommer') {
        return APP_ROUTES.GENERIC_LOGIN;
      }
    }

    return APP_ROUTES.GENERIC_LOGIN;
  }, [isAuthenticated, user, barber, skipPreSignUp]);

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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={APP_ROUTES.BARBER_SIGN_UP}
          component={BarberSignUpScreen}
        />
        <Stack.Screen
          name={APP_ROUTES.BARBER_PRE_SIGN_UP}
          component={BarberPreSignUpScreen}
        />

        <Stack.Screen name={APP_ROUTES.GENERIC_LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={APP_ROUTES.GENERIC_VERIFY_PHONE}
          component={VerifyPhoneScreen}
        />

        {WorkerAuth && (
          <>
            <Stack.Screen
              name={APP_ROUTES.BARBER_QUEUE}
              component={BarberQueueScreen}
            />
            <Stack.Screen
              name={APP_ROUTES.BARBER_SCHEDULE}
              component={BarberScheduleScreen}
            />
          </>
        )}

        {AdminAuth && (
          <>
            <Stack.Screen
              name={APP_ROUTES.BARBER_WORKERS}
              component={BarberWorkers}
            />
            <Stack.Screen
              name={APP_ROUTES.BARBER_SERVICES}
              component={BarberServicesScreen}
            />
            <Stack.Screen
              name={APP_ROUTES.BARBER_BILLING}
              component={BarberBillingScreen}
            />
            <Stack.Screen
              name={APP_ROUTES.BARBER_SETTINGS}
              component={BarberSettingsScreen}
            />
            <Stack.Screen
              name={APP_ROUTES.BARBER_COMPLETE_QR}
              component={BarberCompletedQrScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
