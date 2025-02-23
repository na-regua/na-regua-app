import {TBarberSteps, TCustomerSteps, TLoginSteps} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import {getCurrentUser} from '../AuthSlicer/AuthSlicer';

export type TUserType = 'worker' | 'customer';

interface ILoginState {
  steps: TLoginSteps;
  barberMethod: TBarberSteps;
  customerMethod: TCustomerSteps;
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
    steps: 'welcome',
    barberMethod: 'e-mail',
    customerMethod: 'e-mail',
  },
  reducers: {
    setLoginStep: (state, action: GenericAction<TLoginSteps>) => {
      state.steps = action.payload;
    },
    setCustomerMethod: (state, action: GenericAction<TCustomerSteps>) => {
      state.customerMethod = action.payload;
    },
    setBarberMethod: (state, action: GenericAction<TBarberSteps>) => {
      state.barberMethod = action.payload;
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

export const {
  setLoginStep,
  setLoginUserType,
  setCurrentPhone,
  setBarberMethod,
  setCustomerMethod,
} = LoginSlicer.actions as {
  setLoginStep: ActionCreatorWithPayload<TLoginSteps>;
  setLoginUserType: ActionCreatorWithPayload<TUserType>;
  setCurrentPhone: ActionCreatorWithPayload<string>;
  setBarberMethod: ActionCreatorWithPayload<TBarberSteps>;
  setCustomerMethod: ActionCreatorWithPayload<TCustomerSteps>;
};

export {LoginReducer, LoginSlicer};
