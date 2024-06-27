import {QueueService} from '@/app/api';
import {ModalSizes, SocketUrls} from '@/app/models';
import {Modal, SwipeButton, SwipeButtonState} from '@/components/atoms';
import {WorkerFinishQueueModal} from '@/components/modals';
import {AppDispatch, RootState} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AxiosError} from 'axios';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  OnQueueActionsRowStyled,
  OnQueueActionsStyled,
  OnQueueButtonStyled,
} from './styles';

type Props = {};

const OnQueueActions: React.FC<Props> = () => {
  const {todayQueue} = useSelector((state: RootState) => state.queue);
  const {socket} = useSelector((state: RootState) => state.socket);

  const dispatch = useDispatch<AppDispatch>();

  const [swiping, setSwiping] = useState<SwipeButtonState>('wait');

  const finishModalRef = useRef<BottomSheetModal>(null);

  if (!todayQueue) {
    return null;
  }

  const onPause = () => {
    if (socket) {
      socket.emit(SocketUrls.WorkerPauseQueue);
    }
  };

  const onResume = () => {
    if (socket) {
      socket.emit(SocketUrls.WorkerResumeQueue);
    }
  };

  const openWorkerFinishModal = () => {
    finishModalRef.current?.present();
  };

  const onNext = async (toggled: boolean) => {
    if (toggled) {
      try {
        setSwiping('on');

        await QueueService.goNextTicket();

        setSwiping('off');

        setTimeout(() => {
          setSwiping('wait');
        });
      } catch (error) {
        setSwiping('off');

        setTimeout(() => {
          setSwiping('wait');
        });

        if (error instanceof AxiosError) {
          const {message} = error.response?.data;

          if (message) {
            dispatch(
              createNotification({
                id: 'go_next',
                type: 'error',
                message: `errors.${message}`,
              }),
            );
          }
        }
      }
    }
  };

  return (
    <OnQueueActionsStyled>
      <OnQueueActionsRowStyled>
        {todayQueue.status === 'on' && (
          <OnQueueButtonStyled
            title="barber.onQueue.buttons.pause"
            colorScheme="default"
            variant="outlined"
            onPress={onPause}
          />
        )}
        {todayQueue.status === 'paused' && (
          <OnQueueButtonStyled
            title="barber.onQueue.buttons.resume"
            colorScheme="success"
            onPress={onResume}
          />
        )}
        <OnQueueButtonStyled
          title="barber.onQueue.buttons.finish"
          colorScheme="danger"
          onPress={openWorkerFinishModal}
        />
      </OnQueueActionsRowStyled>
      <SwipeButton
        onToggle={value => {
          onNext(value);
        }}
        resetAfterLoading
        state={swiping}
        title="buttons.next"
      />
      <Modal ref={finishModalRef} height={ModalSizes.WorkerFinishQueue}>
        <WorkerFinishQueueModal />
      </Modal>
    </OnQueueActionsStyled>
  );
};

export {OnQueueActions};
