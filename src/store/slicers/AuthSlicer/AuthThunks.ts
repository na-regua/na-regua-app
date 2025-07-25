import {AuthService} from '@/app/api';
import {ACCESS_TOKEN_KEY} from '@/app/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

const setPersistedToken = createAsyncThunk(
  'Auth/setPersistedToken',
  async (token: string, {rejectWithValue}) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY.toString(), token.toString());

      return token;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const getCurrentUser = createAsyncThunk(
  'Auth/getCurrentUser',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY.toString());

      if (!token) {
        return rejectWithValue(new AxiosError());
      }

      if (token) {
        const {data} = await AuthService.getCurrentUser(token);

        if (data) {
          return {...data, token};
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default {setPersistedToken, getCurrentUser};
