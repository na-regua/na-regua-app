import {SocketUrls} from '@/app/models';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
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
    removeSub: (state, action) => {
      state.subs = state.subs.filter(sub => sub !== action.payload);
    },
    clearSubs: state => {
      state.subs.forEach(sub => {
        if (state.socket) {
          state.socket.off(sub);
        }
      });

      state.subs = [];
    },
    connectSocket: (state, action) => {
      state.socket = action.payload;
      state.connected = true;
    },
    disconnectSocket: state => {
      state.socket = null;
      state.connected = false;
      state.subs = [];
    },
  },
});

export const SocketActions = SocketSlicer.actions as {
  addSub: ActionCreatorWithPayload<SocketUrls>;
  removeSub: ActionCreatorWithPayload<SocketUrls>;
  clearSubs: ActionCreatorWithoutPayload;
  connectSocket: ActionCreatorWithPayload<Socket>;
  disconnectSocket: ActionCreatorWithPayload<void>;
};

const SocketReducer = SocketSlicer.reducer;

export {SocketReducer, SocketSlicer};
