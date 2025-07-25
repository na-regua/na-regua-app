import {ACCESS_TOKEN_KEY} from '@/app/models';
import {navigationRef} from '@/navigation';
import {store} from '@/store/Store';
import {SocketActions, logout} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';

export async function onUnauthorizedResponse(error: any) {
  if (error instanceof AxiosError && error.response?.status === 401) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY.toString());

    const isSocketConnected = store.getState().socket.connected;

    if (isSocketConnected) {
      store.dispatch(SocketActions.disconnectSocket());
    }

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
