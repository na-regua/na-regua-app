import {ServicesService} from '@/app/api';
import {IBarberService} from '@/app/models';
import {Button, Typography} from '@/components/atoms';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ModalActionsStyle, ModalContainerStyle} from './styles';

interface IDeleteServiceModalProps {
  onClose?: () => void;
  service?: IBarberService;
  modalRef: React.RefObject<BottomSheetModal | null>;
}

const DeleteServiceModal: React.FC<IDeleteServiceModalProps> = ({
  onClose,
  service,
  modalRef,
}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);

  if (!service) {
    if (modalRef.current) {
      modalRef.current.close();
    }

    return null;
  }

  const deleteWorker = async () => {
    try {
      setLoading(true);

      const response = await ServicesService.deleteService(service._id);

      if (response) {
        setLoading(false);

        if (modalRef.current) {
          modalRef.current.close();
          onClose && onClose();
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const cancel = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <ModalContainerStyle>
      <Typography variant="body2" color="black1">
        {t('modals.deleteService.subtitle', {name: service.name})}
      </Typography>
      <ModalActionsStyle>
        <Button
          colorScheme="default"
          variant="outlined"
          title={t('modals.deleteService.buttons.no')}
          style={styles.flex}
          onPress={cancel}
        />
        <Button
          colorScheme="danger"
          title={t('modals.deleteService.buttons.yes')}
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

export default DeleteServiceModal;
