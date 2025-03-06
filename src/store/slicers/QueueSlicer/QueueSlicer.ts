import {IQueue} from '@/app/models';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import QueueThunks from './QueueThunks';

interface QueueSlicerState {
  todayQueue?: IQueue;
  workerOnQueue?: boolean;
  loadingTodayQueue: boolean;
  filters?: {
    showServedTickets: boolean;
  };
  viewMode: 'fs' | 'fs-out';
}

const QueueSlicer = createSlice<
  QueueSlicerState,
  SliceCaseReducers<QueueSlicerState>,
  string
>({
  name: 'Queue',
  initialState: {
    workerOnQueue: false,
    loadingTodayQueue: false,
    filters: {
      showServedTickets: false,
    },
    viewMode: 'fs-out',
  },
  reducers: {
    setLoadingTodayQueue: (state, action) => {
      state.loadingTodayQueue = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload};
    },
    updateQueueData: (state, action) => {
      state.todayQueue = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      QueueThunks.fetchPersistedViewMode.fulfilled,
      (state, action) => {
        state.viewMode = action.payload;
      },
    );

    builder.addCase(QueueThunks.persistViewMode.fulfilled, (state, action) => {
      state.viewMode = action.payload;
    });

    builder.addCase(
      QueueThunks.fetchBarberTodayQueue.fulfilled,
      (state, action) => {
        state.loadingTodayQueue = false;

        state.todayQueue = action.payload.data.queue;

        if (action.payload.data.queue) {
          state.workerOnQueue = action.payload.data.queue.workers.some(
            worker =>
              worker.user._id ===
              (action.payload.user && action.payload.user?._id),
          );
        }
      },
    );

    builder.addCase(QueueThunks.fetchBarberTodayQueue.rejected, state => {
      state.loadingTodayQueue = false;
      state.todayQueue = undefined;
    });
  },
});

export const QueueActions = QueueSlicer.actions as {
  setLoadingTodayQueue: ActionCreatorWithPayload<boolean>;
  setFilters: ActionCreatorWithPayload<QueueSlicerState['filters']>;
  updateQueueData: ActionCreatorWithPayload<IQueue | undefined>;
};

const QueueReducer = QueueSlicer.reducer;

export {QueueReducer, QueueSlicer};
