import {QueueUpdateEvent, SocketUrls} from '@/app/models';
import {AppDispatch, RootState} from '@/store/Store';
import {QueueActions, SocketActions} from '@/store/slicers';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const BarberQueueSocketEvents: React.FC = () => {
  const {subs, socket, connected} = useSelector(
    (state: RootState) => state.socket,
  );
  const dispatch = useDispatch<AppDispatch>();

  const joinQueueRooms = useCallback(() => {
    if (!!socket && connected) {
      socket.emit(SocketUrls.WorkerJoinQueueChannels);
    }
  }, [connected, socket]);

  const onQueueUpdate = useCallback(() => {
    if (!!socket && connected && !subs.some(el => el === SocketUrls.GetQueue)) {
      socket.on(SocketUrls.GetQueue, (data: QueueUpdateEvent) => {
        if (data.queue) {
          dispatch(QueueActions.updateQueueData(data.queue));
        }
      });

      dispatch(SocketActions.addSub(SocketUrls.GetQueue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    joinQueueRooms();
  }, [joinQueueRooms]);

  useEffect(() => {
    onQueueUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onQueueUpdate]);

  return <></>;
};

export {BarberQueueSocketEvents};
