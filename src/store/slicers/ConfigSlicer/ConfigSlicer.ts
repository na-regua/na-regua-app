import {SliceCaseReducers, createSlice} from '@reduxjs/toolkit';

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

export const {} = ConfigSlicer.actions as {};

export {ConfigReducer, ConfigSlicer};
