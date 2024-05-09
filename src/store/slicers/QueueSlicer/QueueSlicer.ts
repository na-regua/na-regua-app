import {QueueService} from '@/app/api';
import {IQueue, ON_QUEUE_VIEW_MODE_KEY, TOnQueueViewModes} from '@/app/models';
import {RootState} from '@/store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

interface QueueSlicerState {
  todayQueue?: IQueue;
  workerOnQueue?: boolean;
  loadingTodayQueue: boolean;
  filters?: {
    showServedTickets: boolean;
  };
  viewMode: 'fs' | 'fs-out';
}

export const fetchPersistedViewMode = createAsyncThunk<TOnQueueViewModes>(
  'Queue/getPersistedViewMode',
  async () => {
    const viewMode = await AsyncStorage.getItem(ON_QUEUE_VIEW_MODE_KEY);

    if (!viewMode) {
      return 'fs-out';
    }

    return viewMode as TOnQueueViewModes;
  },
);

export const persistViewMode = createAsyncThunk<
  TOnQueueViewModes,
  TOnQueueViewModes
>('Queue/persistViewMode', async viewMode => {
  await AsyncStorage.setItem(ON_QUEUE_VIEW_MODE_KEY, viewMode);

  return viewMode;
});

export const fetchIsOnQueue = createAsyncThunk(
  'Queue/fetchIsOnQueue',
  async (_, {rejectWithValue, dispatch, getState}) => {
    try {
      dispatch(setLoadingTodayQueue(true));

      const user = (getState() as RootState).auth.user;

      const {data} = await QueueService.getTodayQueue();

      return {user, data};
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
    builder.addCase(fetchPersistedViewMode.fulfilled, (state, action) => {
      state.viewMode = action.payload;
    });

    builder.addCase(persistViewMode.fulfilled, (state, action) => {
      state.viewMode = action.payload;
    });

    builder.addCase(fetchIsOnQueue.fulfilled, (state, action) => {
      state.loadingTodayQueue = false;

      if (!action.payload.data.queue) {
        return;
      }
      state.todayQueue = action.payload.data.queue;

      state.workerOnQueue = action.payload.data.queue.workers.some(
        worker =>
          worker.user._id === (action.payload.user && action.payload.user?._id),
      );
    });

    builder.addCase(fetchIsOnQueue.rejected, (state, action) => {
      state.loadingTodayQueue = false;

      console.log('error queue state', state, action);
    });
  },
});

export const {setLoadingTodayQueue, setFilters, updateQueueData} =
  QueueSlicer.actions as {
    setLoadingTodayQueue: ActionCreatorWithPayload<boolean>;
    setFilters: ActionCreatorWithPayload<QueueSlicerState['filters']>;
    updateQueueData: ActionCreatorWithPayload<IQueue>;
  };

const QueueReducer = QueueSlicer.reducer;

export {QueueReducer, QueueSlicer};
