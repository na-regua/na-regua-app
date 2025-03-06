import {QueueService} from '@/app/api';
import React, {useState} from 'react';

import {Button, Typography} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {QueueActions} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './styles';

interface IWorkerFinishQueueProps {
  modalRef: React.RefObject<BottomSheetModal | null>;
  afterFinish?: () => void;
}

const WorkerFinishQueueModal: React.FC<IWorkerFinishQueueProps> = ({
  modalRef,
  afterFinish,
}) => {
  const [finishing, setFinishing] = useState(false);
  const {todayQueue} = useSelector((state: RootState) => state.queue);
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async () => {
    if (!todayQueue) {
      return;
    }

    setFinishing(true);

    await QueueService.finishQueue(todayQueue?._id);
    setFinishing(false);
    modalRef.current?.dismiss();

    dispatch(QueueActions.updateQueueData(undefined));
    afterFinish?.();
  };

  const onCancel = () => {
    modalRef.current?.dismiss();
  };

  return (
    <Styles.ModalContainerStyle>
      <Typography variant="body2" color="black2">
        {'modals.finishQueue.subtitle'}
      </Typography>
      <Styles.ModalActionsStyle>
        <Button
          fillSpace
          colorScheme="default"
          variant="ghost"
          title="buttons.cancel"
          onPress={onCancel}
        />
        <Button
          fillSpace
          colorScheme="danger"
          title="modals.finishQueue.finish"
          onPress={onFinish}
          loading={finishing}
        />
      </Styles.ModalActionsStyle>
    </Styles.ModalContainerStyle>
  );
};

export default WorkerFinishQueueModal;
