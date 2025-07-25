import {
  QueueService,
  ScheduleService,
  ServicesService,
  TicketsService,
} from '@/app/api';
import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchBarberServicesByBarberId = createAsyncThunk(
  'Cut/fetchBarberServicesByBarberId',
  async (barberId: string, {rejectWithValue}) => {
    try {
      const {data: services} = await ServicesService.getServices({
        barberId,
        additional: false,
      });

      const {data: additionalServices} = await ServicesService.getServices({
        barberId,
        additional: true,
      });

      return {services, additionalServices};
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchBarberTodayQueueByBarberId = createAsyncThunk(
  'Cut/fetchBarberTodayQueueByBarberId',
  async (barberId: string, {rejectWithValue}) => {
    try {
      const response = await QueueService.getBarberTodayQueue(barberId);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchTodayTickets = createAsyncThunk(
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

const fetchAvailableSchedules = createAsyncThunk(
  'Cut/fetchSelectedBarberAvailableSchedules',
  async (barberId: string, {rejectWithValue}) => {
    try {
      const response = await ScheduleService.getAvailableSchedules({barberId});

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default {
  fetchBarberServicesByBarberId,
  fetchBarberTodayQueueByBarberId,
  fetchTodayTickets,
  fetchAvailableSchedules,
};
