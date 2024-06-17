import {ITicketHistoryState, PaginatedFilter} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import TicketHistoryThunks from './TicketHistoryThunks';

const initialState: ITicketHistoryState = {
  tickets: [],
  loading: false,
  filters: {
    offset: 10,
    limit: 10,
    search: '',
    next: true,
  },
  refreshing: false,
};

const TicketHistorySlicer = createSlice<
  ITicketHistoryState,
  SliceCaseReducers<ITicketHistoryState>,
  string
>({
  name: 'TicketHistory',
  initialState: initialState,
  reducers: {
    setFilters: (state, action: GenericAction<Partial<PaginatedFilter>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setLoading: (state, action: GenericAction<boolean>) => {
      state.loading = action.payload;
    },
    setRefreshing: (state, action: GenericAction<boolean>) => {
      state.refreshing = action.payload;
    },
    clear: state => {
      state.tickets = initialState.tickets;
      state.filters = initialState.filters;
      state.loading = initialState.loading;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      TicketHistoryThunks.fetchTicketHistory.fulfilled,
      (state, action) => {
        const {total, limit, offset, next, tickets} = action.payload.data;

        state.tickets = tickets;

        if (state.tickets.length === 0) {
          state.tickets = [];
        }

        state.filters.total = total;
        state.filters.limit = limit;
        state.filters.offset = offset;
        state.filters.next = next;
        state.loading = false;
        if (state.refreshing) {
          state.refreshing = false;
        }
      },
    );

    builder.addCase(
      TicketHistoryThunks.fetchTicketHistory.rejected,
      (state, action) => {
        console.log('TicketHistorySlicer', action.error);
        state.tickets = [];
        state.filters = initialState.filters;
        state.loading = false;
      },
    );
  },
});

const {reducer: TicketHistoryReducer} = TicketHistorySlicer;

export const TicketHistoryActions = TicketHistorySlicer.actions as {
  setFilters: ActionCreatorWithPayload<Partial<PaginatedFilter>>;
  setLoading: ActionCreatorWithPayload<boolean>;
  setRefreshing: ActionCreatorWithPayload<boolean>;
  clear: ActionCreatorWithoutPayload;
};

export {TicketHistoryReducer, TicketHistorySlicer};
