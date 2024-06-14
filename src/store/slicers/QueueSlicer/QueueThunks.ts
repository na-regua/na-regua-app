import {ON_QUEUE_VIEW_MODE_KEY, TOnQueueViewModes} from '@/app/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {QueueActions} from './QueueSlicer';
import {RootState} from '@/store/Store';
import {QueueService} from '@/app/api';

const fetchPersistedViewMode = createAsyncThunk<TOnQueueViewModes>(
  'Queue/getPersistedViewMode',
  async () => {
    const viewMode = await AsyncStorage.getItem(
      ON_QUEUE_VIEW_MODE_KEY.toString(),
    );

    if (!viewMode) {
      return 'fs-out';
    }

    return viewMode as TOnQueueViewModes;
  },
);

const persistViewMode = createAsyncThunk<TOnQueueViewModes, TOnQueueViewModes>(
  'Queue/persistViewMode',
  async viewMode => {
    await AsyncStorage.setItem(ON_QUEUE_VIEW_MODE_KEY.toString(), viewMode);

    return viewMode;
  },
);

const fetchBarberTodayQueue = createAsyncThunk(
  'Queue/fetchBarberTodayQueue',
  async (_, {rejectWithValue, dispatch, getState}) => {
    try {
      dispatch(QueueActions.setLoadingTodayQueue(true));

      const user = (getState() as RootState).auth.user;

      const {data} = await QueueService.getTodayQueue();

      return {user, data};
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default {
  fetchPersistedViewMode,
  persistViewMode,
  fetchBarberTodayQueue,
};
