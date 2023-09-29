import {IBarber} from '@/core/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

interface IBarberReducerState {
  barber?: IBarber;
}

const barberSlicer = createSlice<
  IBarberReducerState,
  SliceCaseReducers<IBarberReducerState>,
  string
>({
  name: 'barber',
  initialState: {},
  reducers: {
    setBarber: (state, action: GenericAction<IBarber>) => {
      state.barber = action.payload;
    },
  },
});

export const setBarber: ActionCreatorWithPayload<IBarber, string> = barberSlicer
  .actions.setBarber as any;

const {reducer} = barberSlicer;

export {reducer as barberReducer, barberSlicer};
