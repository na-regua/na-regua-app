import {TLoginSteps} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import {getCurrentUser} from '../AuthSlicer/AuthSlicer';

export type TUserType = 'worker' | 'customer';

interface ILoginState {
  method: TLoginSteps;
  userType?: TUserType;
  currentPhone?: string;
}

const LoginSlicer = createSlice<
  ILoginState,
  SliceCaseReducers<ILoginState>,
  string
>({
  name: 'Login',
  initialState: {
    method: 'welcome',
  },
  reducers: {
    setLoginMethod: (state, action: GenericAction<TLoginSteps>) => {
      state.method = action.payload;
    },
    setLoginUserType: (state, action: GenericAction<TUserType>) => {
      state.userType = action.payload;
    },
    setCurrentPhone: (state, action: GenericAction<string>) => {
      state.currentPhone = action.payload;
    },
  },
  extraReducers: builder => {
    // Add extra reducers here
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        if (action.payload.user && action.payload.user.role === 'customer') {
          state.userType = 'customer';
        }

        if (action.payload.user && action.payload.barber) {
          state.userType = 'worker';
        }
      }
    });
  },
});

const {reducer: LoginReducer} = LoginSlicer;

export const {setLoginMethod, setLoginUserType, setCurrentPhone} =
  LoginSlicer.actions as {
    setLoginMethod: ActionCreatorWithPayload<TLoginSteps>;
    setLoginUserType: ActionCreatorWithPayload<TUserType>;
    setCurrentPhone: ActionCreatorWithPayload<string>;
  };

export {LoginReducer, LoginSlicer};
