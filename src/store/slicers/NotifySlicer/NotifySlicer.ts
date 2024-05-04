import {NotificationService} from '@/app/api';
import {IGetNotificationFilters, INotification, INotify} from '@/app/models';
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
}

export const fetchUserNotifications = createAsyncThunk<INotification[]>(
  'Notification/getUserNotifications',
  async (_, {dispatch, getState, rejectWithValue}) => {
    try {
      dispatch(setIsLoadingNotifications(true));

      const filters = (getState() as RootState).notify.filters;

      const {data} = await NotificationService.getNotifications(filters);

      if (data) {
        return data;
      }
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
    filters: {
      limit: 20,
    },
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
      state.loading = false;
      state.userNotifications = action.payload;
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
  changeGetNofiticationFilters,
  setIsLoadingNotifications,
} = NotifySlicer.actions as {
  createNotification: ActionCreatorWithPayload<INotify>;
  removeNotification: ActionCreatorWithPayload<string>;
  changeGetNofiticationFilters: ActionCreatorWithPayload<IGetNotificationFilters>;
  setIsLoadingNotifications: ActionCreatorWithPayload<boolean>;
};

export {reducer as NotifyReducer, NotifySlicer};
