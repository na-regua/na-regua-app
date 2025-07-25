import {NotificationService} from '@/app/api';
import {
  GetNotificationResponse,
  IGetNotificationFilters,
  INotification,
  INotify,
} from '@/app/models';
import {GenericAction, RootState} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

interface INotifyState {
  systemNotifications: INotify[];
  userNotifications: INotification[];
  filters: IGetNotificationFilters;
  loading: boolean;
  total: number;
  hasUnread: boolean;
}

export const fetchUserNotifications = createAsyncThunk<
  GetNotificationResponse,
  {reload?: boolean} | undefined
>(
  'Notification/getUserNotifications',
  async (params = {reload: true}, {dispatch, getState, rejectWithValue}) => {
    try {
      if (params.reload) {
        dispatch(setIsLoadingNotifications(true));
      }

      const filters = (getState() as RootState).notify.filters;

      const {data} = await NotificationService.getNotifications(filters);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const NotifySlicer = createSlice<
  INotifyState,
  SliceCaseReducers<INotifyState>,
  string
>({
  name: 'Config',
  initialState: {
    systemNotifications: [],
    userNotifications: [],
    loading: false,
    total: 0,
    filters: {
      limit: 20,
    },
    hasUnread: false,
  },
  reducers: {
    createNotification: (state, action: GenericAction<INotify>) => {
      state.systemNotifications.push(action.payload);
    },
    removeNotification: (state, action: GenericAction<string>) => {
      state.systemNotifications = state.systemNotifications.filter(
        notification => notification.id !== action.payload,
      );
    },
    changeGetNofiticationFilters: (
      state,
      action: GenericAction<IGetNotificationFilters>,
    ) => {
      state.filters = {...state.filters, ...action.payload};
    },
    setIsLoadingNotifications: (state, action: GenericAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserNotifications.fulfilled, (state, action) => {
      if (action.payload) {
        state.userNotifications = action.payload.notifications;
        state.total = action.payload.total;
        state.hasUnread = action.payload.hasUnread;
      }

      state.loading = false;
    });

    builder.addCase(fetchUserNotifications.rejected, state => {
      state.loading = false;
      state.userNotifications = [];
    });
  },
});

const {reducer} = NotifySlicer;

export const {
  createNotification,
  removeNotification,
  changeGetNotificationFilters,
  setIsLoadingNotifications,
} = NotifySlicer.actions as {
  createNotification: ActionCreatorWithPayload<INotify>;
  removeNotification: ActionCreatorWithPayload<string>;
  changeGetNotificationFilters: ActionCreatorWithPayload<IGetNotificationFilters>;
  setIsLoadingNotifications: ActionCreatorWithPayload<boolean>;
};

export {reducer as NotifyReducer, NotifySlicer};
