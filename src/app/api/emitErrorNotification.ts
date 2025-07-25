import {createNotification} from '@/store/slicers';
import {store} from '@/store/Store';
import {AxiosError} from 'axios';

export const emitErrorNotification = (error: AxiosError<any>) => {
  if (error) {
    const message = error.response?.data.message;

    if (message) {
      store.dispatch(
        createNotification({
          id: `error.${message}`,
          type: 'error',
          message: `errors.${message}`,
        }),
      );
    }
  }
};
