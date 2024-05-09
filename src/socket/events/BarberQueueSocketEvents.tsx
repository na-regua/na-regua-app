import {QueueUpdateEvent, SocketUrls} from '@/app/models';
import {AppDispatch, RootState} from '@/store/Store';
import {addSub, updateQueueData} from '@/store/slicers';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const BarberQueueSocketEvents: React.FC = () => {
  const {subs, socket} = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch<AppDispatch>();

  const onQueueUpdate = useCallback(() => {
    if (!!socket && !subs.some(el => el === SocketUrls.GetQueue)) {
      socket.on(SocketUrls.GetQueue, (data: QueueUpdateEvent) => {
        console.log('Queue update received');
        if (data.queue) {
          dispatch(updateQueueData(data.queue));
        }
      });

      dispatch(addSub(SocketUrls.GetQueue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onQueueUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onQueueUpdate]);

  return <></>;
};

export {BarberQueueSocketEvents};
