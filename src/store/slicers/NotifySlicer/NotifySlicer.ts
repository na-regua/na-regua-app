import {INotify} from '@/app/models';
import {GenericAction} from '@/store/Store';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

interface INotifyState {
  notifications: INotify[];
}

const NotifySlicer = createSlice<
  INotifyState,
  SliceCaseReducers<INotifyState>,
  string
>({
  name: 'Config',
  initialState: {
    notifications: [],
  },
  reducers: {
    createNotification: (state, action: GenericAction<INotify>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: GenericAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload,
      );
    },
  },
});

const {reducer} = NotifySlicer;

export const {createNotification, removeNotification} =
  NotifySlicer.actions as {
    createNotification: ActionCreatorWithPayload<INotify>;
    removeNotification: ActionCreatorWithPayload<string>;
  };

export {reducer as NotifyReducer, NotifySlicer};
