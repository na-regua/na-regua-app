import {ServicesService} from '@/app/api';
import {
  IBarber,
  IBarberService,
  ICutState,
  TAttendanceType,
  TCutSteps,
} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const CutPersistedKey = 'cut';

export const fetchBarberServices = createAsyncThunk(
  'Cut/fetchBarberServices',
  async (barberId: string, {rejectWithValue}) => {
    try {
      const response = await ServicesService.getServices({barberId});

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const CutSlicer = createSlice<ICutState, SliceCaseReducers<ICutState>, string>({
  name: 'Login',
  initialState: {
    steps: 'select',
  },
  reducers: {
    setCutStep: (state, action: GenericAction<TCutSteps>) => {
      state.steps = action.payload;
    },
    setAttendanceType: (state, action: GenericAction<TAttendanceType>) => {
      state.attendanceType = action.payload;
    },
    setCutSelectedService: (state, action: GenericAction<IBarberService>) => {
      state.selectedService = action.payload;
    },
    setCutSelectedBarber: (state, action: GenericAction<IBarber>) => {
      state.selectedBarber = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBarberServices.fulfilled, (state, action) => {
      state.services = action.payload.data;
    });
  },
});

const {reducer: CutReducer} = CutSlicer;

export const CutActions = CutSlicer.actions as {
  setCutStep: ActionCreatorWithPayload<TCutSteps>;
  setAttendanceType: ActionCreatorWithPayload<TAttendanceType>;
  setCutSelectedService: ActionCreatorWithPayload<IBarberService | null>;
  setCutSelectedBarber: ActionCreatorWithPayload<IBarber | null>;
};

export {CutReducer, CutSlicer};
