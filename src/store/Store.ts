import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {AuthReducer, ConfigReducer, NotifyReducer} from './slicers';

export interface GenericAction<T = any> {
  type: string;
  payload: T;
}

const rootReducer = combineReducers({
  auth: AuthReducer,
  config: ConfigReducer,
  notify: NotifyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
