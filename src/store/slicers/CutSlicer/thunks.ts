import {QueueService, ServicesService, TicketsService} from '@/app/api';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchBarberServices = createAsyncThunk(
  'Cut/fetchBarberServices',
  async (barberId: string, {rejectWithValue}) => {
    try {
      const response = await ServicesService.getServices({barberId});

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchBarberTodayQueue = createAsyncThunk(
  'Cut/fetchBarberTodayQueue',
  async (barberId: string, {rejectWithValue}) => {
    try {
      const response = await QueueService.getBarberTodayQueue(barberId);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchTodayTickets = createAsyncThunk(
  'Cut/fetchTodayTickets',
  async (_, {rejectWithValue}) => {
    try {
      const response = await TicketsService.getToday();

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
