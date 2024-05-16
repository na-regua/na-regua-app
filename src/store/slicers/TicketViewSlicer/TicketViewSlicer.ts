import {ITicket, ITicketViewState} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

// export const fetchTicketData = createAsyncThunk(
//   'TicketView/fetchTicketData',
//   async (barberId: string, {rejectWithValue}) => {
//     try {
//       return [];
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );

const TicketViewSlicer = createSlice<
  ITicketViewState,
  SliceCaseReducers<ITicketViewState>,
  string
>({
  name: 'TicketView',
  initialState: {
    ticket: null,
    loading: false,
  },
  reducers: {
    setTicketView: (state, action: GenericAction<ITicket>) => {
      state.ticket = action.payload;
    },
  },
  extraReducers: builder => {},
});

const {reducer: TicketViewReducer} = TicketViewSlicer;

export const TicketViewActions = TicketViewSlicer.actions as {
  setTicketView: ActionCreatorWithPayload<ITicket | null>;
};

export {TicketViewReducer, TicketViewSlicer};
