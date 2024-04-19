import {TLoginSteps} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

export type TUserType = 'worker' | 'customer';

interface ILoginState {
  method: TLoginSteps;
  userType?: TUserType;
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
  },
});

const {reducer: LoginReducer} = LoginSlicer;

export const {setLoginMethod, setLoginUserType} = LoginSlicer.actions as {
  setLoginMethod: ActionCreatorWithPayload<TLoginSteps>;
  setLoginUserType: ActionCreatorWithPayload<TUserType>;
};

export {LoginReducer, LoginSlicer};
