import {TNotifyTypes} from '@/app/models';
import {store} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';

export interface UserNotifierReturn {
  emit: (id: string, message: string, type?: TNotifyTypes) => void;
  throwError: (error: AxiosError) => void;
}

const useNotifier = (): UserNotifierReturn => {
  const emit = (id: string, message: string, type?: TNotifyTypes) => {
    store.dispatch(
      createNotification({
        id,
        type: type || 'default',
        message,
      }),
    );
  };

  const throwError = (error: AxiosError) => {
    const {message} = error.response?.data as any;

    if (message) {
      store.dispatch(
        createNotification({
          id: `errors.${message}`,
          type: 'error',
          message: `errors.${message}`,
        }),
      );
    }
  };

  return {
    emit,
    throwError,
  };
};

export {useNotifier};
