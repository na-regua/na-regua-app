import {IFile} from '@/app/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  SliceCaseReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

interface IConfigState {
  skipPre: boolean;
}

export const SKIP_PRE_SIGN_UP_KEY = 'skipPreSignUp';

const getSkipPre = createAsyncThunk(
  'Config/getSkipPre',
  async (_, {rejectWithValue}) => {
    try {
      const skipPre = await AsyncStorage.getItem(SKIP_PRE_SIGN_UP_KEY);

      return skipPre === 'true';
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const ConfigSlicer = createSlice<
  IConfigState,
  SliceCaseReducers<IConfigState>,
  string
>({
  name: 'Config',
  initialState: {
    skipPre: false,
  },
  reducers: {
    clearConfig: state => {
      state.skipPre = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSkipPre.fulfilled, (state, action) => {
      state.skipPre = action.payload;
    });
  },
});

const {reducer: ConfigReducer} = ConfigSlicer;

export const {clearConfig} = ConfigSlicer.actions as {
  clearConfig: ActionCreatorWithoutPayload;
  setLoadingFiles: ActionCreatorWithPayload<boolean>;
  setAvatar: ActionCreatorWithPayload<IFile>;
};

export {ConfigReducer, ConfigSlicer, getSkipPre};
