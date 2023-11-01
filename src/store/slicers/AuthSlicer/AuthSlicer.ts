import {AuthService} from '@/app/api';
import {IBarber, IUser} from '@/app/models';
import {GenericAction} from '@/store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
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

const getCurrentUser = createAsyncThunk(
  'Auth/getCurrentUser',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
        const {data} = await AuthService.getCurrentUser(token);

        if (data) {
          return {...data, token};
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
    },
    setUser: (state, action: GenericAction<IUser>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = '';
      state.barber = undefined;
      state.user = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.barber = action.payload.barber;
        state.user = action.payload.user;
      }
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
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

export const {logout, setUser, setBarber} = AuthSlicer.actions as {
  logout: ActionCreatorWithoutPayload<string>;
  setUser: ActionCreatorWithPayload<IUser, string>;
  setBarber: ActionCreatorWithPayload<IBarber, string>;
};

export {
  ACCESS_TOKEN_KEY,
  reducer as AuthReducer,
  AuthSlicer,
  getCurrentUser,
  setPersistedToken,
};
