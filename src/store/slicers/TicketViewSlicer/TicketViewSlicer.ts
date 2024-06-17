import {IQueue, ITicket, ITicketViewState} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

const TicketViewSlicer = createSlice<
  ITicketViewState,
  SliceCaseReducers<ITicketViewState>,
  string
>({
  name: 'TicketView',
  initialState: {
    ticket: null,
    loading: false,
    queue: null,
  },
  reducers: {
    setTicket: (state, action: GenericAction<ITicket>) => {
      state.ticket = action.payload;
    },
    setQueue: (state, action: GenericAction<IQueue>) => {
      state.queue = action.payload;
    },
  },
});

const {reducer: TicketViewReducer} = TicketViewSlicer;

export const TicketViewActions = TicketViewSlicer.actions as {
  setTicket: ActionCreatorWithPayload<ITicket | null>;
  setQueue: ActionCreatorWithPayload<IQueue | null>;
};

export {TicketViewReducer, TicketViewSlicer};
