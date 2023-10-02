import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {barberReducer, signInReducer} from './slicers';

export interface GenericAction<T = any> {
  type: string;
  payload: T;
}

const rootReducer = combineReducers({
  signIn: signInReducer,
  barber: barberReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
