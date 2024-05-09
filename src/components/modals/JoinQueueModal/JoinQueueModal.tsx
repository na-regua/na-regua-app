import {Typography} from '@/components/atoms';
import {TRouteName} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {workerJoinQueue} from '@/store/slicers';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonStyled,
  JoinQueueActionsStyled,
  JoinQueueContainerStyled,
} from './styles';

interface JoinQueueModalProps {
  dismiss?: () => void;
  navigate: (route: TRouteName) => void;
}

const JoinQueueModal: React.FC<JoinQueueModalProps> = ({dismiss, navigate}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {workerOnQueue} = useSelector((state: RootState) => state.queue);

  const join = () => {
    dispatch(workerJoinQueue());

    if (dismiss) {
      dismiss();
    }

    navigate('/barber/queue/fs');
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

export default JoinQueueModal;
