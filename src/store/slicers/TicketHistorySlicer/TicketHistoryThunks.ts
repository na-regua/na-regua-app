import {TicketsService} from '@/app/api';
import {RootState} from '@/store/Store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TicketHistoryActions} from './TicketHistorySlicer';

const fetchTicketHistory = createAsyncThunk(
  'TicketHistory/fetchTicketHistory',
  async (_, {getState, dispatch}) => {
    dispatch(TicketHistoryActions.setLoading(true));

    const {filters, refreshing, tickets} = (getState() as RootState)
      .ticketHistory;
    const copyFilters = {...filters};

    if (refreshing) {
      copyFilters.offset = 0;
      copyFilters.limit = tickets.length;
    }

    const response = await TicketsService.getHistory(copyFilters);

    return response;
  },
);

export default {fetchTicketHistory};
