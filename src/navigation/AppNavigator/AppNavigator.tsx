import React, {useCallback, useEffect, useMemo} from 'react';

import {
  BarberBillingScreen,
  BarberCompletedQrScreen,
  BarberPreSignUpScreen,
  BarberQueueScreen,
  BarberScheduleScreen,
  BarberServicesConfigScreen,
  BarberServicesScreen,
  BarberSettingsProfileScreen,
  BarberSettingsScreen,
  BarberSignUpScreen,
  LoginScreen,
  SplashScreen,
  VerifyPhoneScreen,
} from '@/screens';
import BarberWorkers from '@/screens/BarberWorkers/BarberWorkers';
import {RootState} from '@/store/Store';
import {SKIP_PRE_SIGN_UP_KEY} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {TRootStackParamList} from '../appRoutes';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppNavigator: React.FC = () => {
  const {isLoading, isAuthenticated, user, barber} = useSelector(
    (state: RootState) => state.auth,
  );

  const skipPreSignUp = useSelector((state: RootState) => state.config.skipPre);

  const initialRouteName = useMemo(() => {
    if (!isAuthenticated) {
      return '/generic/login';
    }

    if (user) {
      if (barber && (user.role === 'admin' || user.role === 'worker')) {
        if (!skipPreSignUp && barber.profileStatus !== 'completed') {
          return '/barber/pre-sign-up';
        }

        return '/barber/queue';
      } else if (user.role === 'custommer') {
        return '';
      }
    }

    return '/generic/login';
  }, [isAuthenticated, user, barber, skipPreSignUp]);

  const setSkipPreSignUp = useCallback(async () => {
    if (!skipPreSignUp && barber && barber.profileStatus === 'completed') {
      await AsyncStorage.setItem(SKIP_PRE_SIGN_UP_KEY, 'true');
    }
  }, [skipPreSignUp, barber]);

  useEffect(() => {
    setSkipPreSignUp();
  }, [setSkipPreSignUp]);

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
          name={'/generic/verify-phone'}
          component={VerifyPhoneScreen}
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
              initialParams={{showContinue: true}}
            />
            <Stack.Screen
              name={'/barber/settings/services'}
              component={BarberServicesScreen}
              initialParams={{showContinue: true}}
            />
            <Stack.Screen
              name={'/barber/complete-qr'}
              component={BarberCompletedQrScreen}
            />
            <Stack.Screen
              name={'/barber/settings/services/config'}
              component={BarberServicesConfigScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
