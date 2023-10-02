import {BarberSignUpScreen, LoginScreen, VerifyPhoneScreen} from '@/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="GenericLogin"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GenericLogin" component={LoginScreen} />
      <Stack.Screen name="BarberSignUp" component={BarberSignUpScreen} />
      <Stack.Screen name="GenericVerifyPhone" component={VerifyPhoneScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
