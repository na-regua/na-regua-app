import {ICreateBarber} from '@/core/models';
import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit';

interface ISignInReducerState {
  barber?: ICreateBarber;
}

const signInSlicer = createSlice<
  ISignInReducerState,
  SliceCaseReducers<ISignInReducerState>,
  string
>({
  name: 'signIn',
  initialState: {},
  reducers: {
    setBarber: (state, action) => {
      state.barber = action.payload;
    },
    updateBarber: (state, action) => {
      state.barber = {...state.barber, ...action.payload};
    },
  },
});

const {reducer} = signInSlicer;

export {reducer as signInReducer, signInSlicer};
