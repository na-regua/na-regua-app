import React, {useMemo} from 'react';

import {
  BarberPreSignUpScreen,
  BarberQueueScreen,
  BarberSignUpScreen,
  LoginScreen,
  SplashScreen,
  VerifyPhoneScreen,
} from '@/screens';
import {RootState} from '@/store/Store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {APP_ROUTES} from '../appRoutes';
import BarberWorkers from '@/screens/BarberWorkers/BarberWorkers';

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
      if (barber && (user.role === 'admin' || user.role === 'barber')) {
        if (!skipPreSignUp) {
          return APP_ROUTES.BARBER_PRE_SIGN_UP;
        }

        return APP_ROUTES.BARBER_QUEUE;
      } else if (user.role === 'customer') {
        return APP_ROUTES.GENERIC_LOGIN;
      }
    }

    return APP_ROUTES.GENERIC_LOGIN;
  }, [isAuthenticated, user, barber, skipPreSignUp]);

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

        {isAuthenticated && (
          <>
            <Stack.Screen
              name={APP_ROUTES.BARBER_QUEUE}
              component={BarberQueueScreen}
            />
            <Stack.Screen
              name={APP_ROUTES.BARBER_PRE_WORKERS}
              component={BarberWorkers}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
