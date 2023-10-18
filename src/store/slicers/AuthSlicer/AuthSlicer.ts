import {AuthService} from '@/app/api';
import {IBarber, IUser} from '@/app/models';
import {GenericAction} from '@/store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

interface IAuthState {
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
  barber?: IBarber;
  user?: IUser;
}

const ACCESS_TOKEN_KEY = 'access_token';

const setPersistedToken = createAsyncThunk(
  'Auth/setPersistedToken',
  async (token: string, {rejectWithValue}) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);

      return token;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const getPersistedUser = createAsyncThunk(
  'Auth/getPersistedToken',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
        const {data} = await AuthService.getCurrentUser(token);

        if (data) {
          return {token, ...data};
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
      state.user = action.payload.user;
    },
    setUser: (state, action: GenericAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPersistedUser.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.barber = action.payload.barber;
        state.user = action.payload.user;

        console.log('Token: ', action.payload.token);
      }
    });

    builder.addCase(getPersistedUser.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log('Error: ', action.payload.response?.data);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = '';
      }
    });

    builder.addCase(setPersistedToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload;
    });
  },
});

const {reducer} = AuthSlicer;

const setBarber: ActionCreatorWithPayload<IBarber, string> = AuthSlicer.actions
  .setBarber as any;

const setUser: ActionCreatorWithPayload<IBarber, string> = AuthSlicer.actions
  .setUser as any;

export {
  ACCESS_TOKEN_KEY,
  reducer as AuthReducer,
  AuthSlicer,
  getPersistedUser,
  setBarber,
  setPersistedToken,
  setUser,
};
