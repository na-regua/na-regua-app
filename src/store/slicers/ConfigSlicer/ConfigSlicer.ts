import {IFile} from '@/app/models';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

interface IConfigState {}

const ConfigSlicer = createSlice<
  IConfigState,
  SliceCaseReducers<IConfigState>,
  string
>({
  name: 'Config',
  initialState: {},
  reducers: {},
});

const {reducer: ConfigReducer} = ConfigSlicer;

export const {} = ConfigSlicer.actions as {
  clearConfig: ActionCreatorWithoutPayload;
  setLoadingFiles: ActionCreatorWithPayload<boolean>;
  setAvatar: ActionCreatorWithPayload<IFile>;
};

export {ConfigReducer, ConfigSlicer};
