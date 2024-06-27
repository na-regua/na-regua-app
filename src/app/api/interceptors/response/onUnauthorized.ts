import {AxiosError} from 'axios';
import {store} from '@/store/Store';
import {
  ACCESS_TOKEN_KEY,
  SocketActions,
  createNotification,
  logout,
} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '@/navigation';

export async function onUnauthorizedResponse(error: any) {
  if (error instanceof AxiosError && error.response?.status === 401) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY.toString());

    store.dispatch(
      createNotification({
        id: 'unauthorized',
        message: 'errors.UNAUTHORIZED',
        type: 'error',
      }),
    );

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
