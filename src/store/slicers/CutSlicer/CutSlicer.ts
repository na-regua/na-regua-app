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
  ActionCreatorWithoutPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import {CutThunks} from '.';

export const CutPersistedKey = 'cut';

const CutSlicer = createSlice<ICutState, SliceCaseReducers<ICutState>, string>({
  name: 'Login',
  initialState: {
    steps: 'select',
    selectedAdditionalServices: [],
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
    addCutSelectedAdditionalService: (
      state,
      action: GenericAction<IBarberService>,
    ) => {
      if (state.selectedAdditionalServices) {
        state.selectedAdditionalServices.push(action.payload);
      }
    },
    removeCutSelectedAdditionalService: (
      state,
      action: GenericAction<IBarberService>,
    ) => {
      if (state.selectedAdditionalServices) {
        state.selectedAdditionalServices =
          state.selectedAdditionalServices.filter(
            service => service._id !== action.payload._id,
          );
      }
    },
    resetCut: state => {
      state.steps = 'select';
      state.attendanceType = 'queue';
      state.selectedService = undefined;
      state.selectedBarber = undefined;
      state.selectedAdditionalServices = [];
    },
    setShowSelectedModal: (state, action: GenericAction<boolean>) => {
      state.showSelectedModal = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      CutThunks.fetchBarberServicesByBarberId.fulfilled,
      (state, action) => {
        state.services = action.payload.services;
        state.additionalServices = action.payload.additionalServices;
      },
    );

    builder.addCase(CutThunks.fetchTodayTickets.fulfilled, (state, action) => {
      state.todayTickets = action.payload.data;

      if (action.payload.data.queue) {
        state.customerIsOnQueue = true;
      }
    });

    builder.addCase(
      CutThunks.fetchBarberTodayQueueByBarberId.fulfilled,
      (state, action) => {
        state.barberTodayQueue = action.payload.data.queue;
      },
    );
  },
});

const {reducer: CutReducer} = CutSlicer;

export const CutActions = CutSlicer.actions as {
  setCutStep: ActionCreatorWithPayload<TCutSteps>;
  setAttendanceType: ActionCreatorWithPayload<TAttendanceType>;
  setCutSelectedService: ActionCreatorWithPayload<IBarberService | null>;
  setCutSelectedBarber: ActionCreatorWithPayload<IBarber | null>;
  resetCut: ActionCreatorWithoutPayload;
  addCutSelectedAdditionalService: ActionCreatorWithPayload<IBarberService>;
  removeCutSelectedAdditionalService: ActionCreatorWithPayload<IBarberService>;
  setShowSelectedModal: ActionCreatorWithPayload<boolean>;
};

export {CutReducer, CutSlicer};
