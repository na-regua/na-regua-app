import {IBarber, IUser} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import AuthThunks from './AuthThunks';

interface IAuthState {
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
  barber?: IBarber;
  user?: IUser;
}

const AuthSlicer = createSlice<
  IAuthState,
  SliceCaseReducers<IAuthState>,
  string
>({
  name: 'Auth',
  initialState: {
    isAuthenticated: false,
    token: '',
    isLoading: true,
    barber: undefined,
    user: undefined,
  },
  reducers: {
    setBarber: (state, action: GenericAction<IBarber>) => {
      state.barber = action.payload;
    },
    setUser: (state, action: GenericAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = '';
      state.barber = undefined;
      state.user = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(AuthThunks.getCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.barber = action.payload.barber;
        state.user = action.payload.user;
      }

      state.isLoading = false;
    });

    builder.addCase(AuthThunks.getCurrentUser.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.isAuthenticated = false;
        state.token = '';
      }

      state.isLoading = false;
    });

    builder.addCase(AuthThunks.setPersistedToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload;
    });
  },
});

const {reducer} = AuthSlicer;

export const {logout, setUser, setBarber} = AuthSlicer.actions as {
  logout: ActionCreatorWithoutPayload;
  setUser: ActionCreatorWithPayload<IUser, string>;
  setBarber: ActionCreatorWithPayload<IBarber, string>;
};

export {reducer as AuthReducer, AuthSlicer};
