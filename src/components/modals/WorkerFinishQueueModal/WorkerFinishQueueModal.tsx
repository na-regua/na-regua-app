import {useNotifier} from '@/hooks/useNotifier';
import {AxiosError} from 'axios';
import React from 'react';

interface IWorkerFinishQueueProps {}

const WorkerFinishQueueModal: React.FC<IWorkerFinishQueueProps> = () => {
  const {throwError} = useNotifier();

  const onFinish = async () => {
    try {
    } catch (error) {
      if (error instanceof AxiosError) {
        throwError(error);
      }
    }
  };

  return <></>;
};

export default WorkerFinishQueueModal;
