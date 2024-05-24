import {Typography} from '@/components/atoms';
import {TRouteName} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonStyled,
  JoinQueueActionsStyled,
  JoinQueueContainerStyled,
} from './styles';
import {QueueService} from '@/app/api';
import {QueueActions} from '@/store/slicers';

interface WorkerJoinQueueModalProps {
  dismiss?: () => void;
  navigate: (route: TRouteName) => void;
}

const WorkerJoinQueueModal: React.FC<WorkerJoinQueueModalProps> = ({
  dismiss,
  navigate,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {workerOnQueue} = useSelector((state: RootState) => state.queue);

  const join = async () => {
    const {data} = await QueueService.workerJoin();

    if (data.queue) {
      dispatch(QueueActions.updateQueueData(data.queue));

      if (dismiss) {
        dismiss();
      }

      navigate('/barber/queue/fs');
    }
  };

  const cancelJoinQueue = () => {
    if (dismiss) {
      dismiss();
    }
  };

  return (
    <JoinQueueContainerStyled>
      {!workerOnQueue && (
        <Typography variant="body2" color="black2">
          {'modals.joinQueue.queueOpened'}
        </Typography>
      )}
      {workerOnQueue && (
        <Typography variant="body2" color="black2">
          {'modals.joinQueue.isOnQueue'}
        </Typography>
      )}
      <JoinQueueActionsStyled>
        <ButtonStyled
          title="modals.joinQueue.buttons.cancel"
          onPress={cancelJoinQueue}
          colorScheme="default"
          variant="outlined"
        />
        <ButtonStyled
          title="modals.joinQueue.buttons.join"
          onPress={join}
          colorScheme="primary"
        />
      </JoinQueueActionsStyled>
    </JoinQueueContainerStyled>
  );
};

export default WorkerJoinQueueModal;
