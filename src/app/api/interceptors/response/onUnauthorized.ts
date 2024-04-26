import {AxiosError} from 'axios';
import {store} from '@/store/Store';
import {ACCESS_TOKEN_KEY, createNotification, logout} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '@/navigation';

export async function onUnauthorizedResponse(error: any) {
  if (error instanceof AxiosError && error.response?.status === 401) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

    store.dispatch(
      createNotification({
        id: 'unauthorized',
        message: 'Unauthorized',
        type: 'error',
      }),
    );

    store.dispatch(logout());

    if (navigationRef && navigationRef.current) {
      if (store.getState().login.userType === 'customer') {
        navigationRef.current.navigate('/generic/login/customer');
      }

      if (store.getState().login.userType === 'worker') {
        navigationRef.current.navigate('/generic/login/barber');
      }
    }
  }

  return Promise.reject(error);
}
