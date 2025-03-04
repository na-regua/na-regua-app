import {QueueService} from '@/app/api';
import {ModalSizes, SocketUrls} from '@/app/models';
import {Modal, SwipeButton, SwipeButtonState} from '@/components/atoms';
import {WorkerFinishQueueModal} from '@/components/modals';
import {RootState} from '@/store/Store';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  OnQueueActionsRowStyled,
  OnQueueActionsStyled,
  OnQueueButtonStyled,
} from './styles';

type Props = {};

const OnQueueActions: React.FC<Props> = () => {
  const {todayQueue} = useSelector((state: RootState) => state.queue);
  const {socket} = useSelector((state: RootState) => state.socket);

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
      } catch {
        setSwiping('off');

        setTimeout(() => {
          setSwiping('wait');
        });
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
