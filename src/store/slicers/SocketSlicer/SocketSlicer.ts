import {SocketUrls} from '@/app/models';
import {
  ActionCreatorWithPayload,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import {Socket} from 'socket.io-client';

interface SocketSlicerState {
  subs: SocketUrls[];
  workerJoinedQueue?: boolean;
  socket: Socket | null;
  connected: boolean;
}

const SocketSlicer = createSlice<
  SocketSlicerState,
  SliceCaseReducers<SocketSlicerState>,
  string
>({
  name: 'Queue',
  initialState: {
    subs: [],
    workerJoinedQueue: false,
    connected: false,
    socket: null,
  },
  reducers: {
    addSub: (state, action) => {
      if (!state.subs.includes(action.payload)) {
        state.subs.push(action.payload);
      }
    },
    connectSocket: (state, action) => {
      state.socket = action.payload;
      state.connected = true;
    },
    disconnectSocket: state => {
      state.socket = null;
      state.connected = false;
    },
  },
});

export const SocketActions = SocketSlicer.actions as {
  addSub: ActionCreatorWithPayload<SocketUrls>;
  connectSocket: ActionCreatorWithPayload<Socket>;
  disconnectSocket: ActionCreatorWithPayload<void>;
};

const SocketReducer = SocketSlicer.reducer;

export {SocketReducer, SocketSlicer};
