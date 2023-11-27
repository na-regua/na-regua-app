import {WorkersService} from '@/app/api';
import {IWorker} from '@/app/models';
import {Button, Typography} from '@/components/atoms';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ModalActionsStyle, ModalContainerStyle} from './styles';
import {StyleSheet} from 'react-native';

interface IDeleteWorkerModalProps {
  worker?: IWorker;
  modalRef: React.RefObject<BottomSheetModal | null>;
  onClose?: (reloadData?: boolean) => void;
}

const DeleteWorkerModal: React.FC<IDeleteWorkerModalProps> = ({
  worker,
  modalRef,
  onClose,
}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);

  if (!worker) {
    if (modalRef.current) {
      modalRef.current.dismiss();
    }

    return null;
  }

  const deleteWorker = async () => {
    try {
      setLoading(true);

      const response = await WorkersService.deleteWorker(worker._id);

      if (response) {
        setLoading(false);

        close();
        onClose && onClose(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const close = () => {
    if (modalRef.current) {
      modalRef.current.dismiss();
      onClose && onClose();
    }
  };

  return (
    <ModalContainerStyle>
      <Typography variant="body2" color="black1">
        {t('modals.deleteWorker.subtitle', {name: worker.user.name})}
      </Typography>
      <ModalActionsStyle>
        <Button
          colorScheme="default"
          variant="outlined"
          title={t('modals.deleteWorker.buttons.no')}
          style={styles.flex}
          onPress={close}
        />
        <Button
          colorScheme="danger"
          title={t('modals.deleteWorker.buttons.yes')}
          loading={loading}
          onPress={deleteWorker}
          style={styles.flex}
        />
      </ModalActionsStyle>
    </ModalContainerStyle>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default DeleteWorkerModal;
