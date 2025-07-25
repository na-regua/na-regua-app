import {Button, Icons, Typography} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  ImagePreviewStyle,
  ModalContainerActionsStyle,
  ModalContainerStyle,
  ModalContainerTitleStyle,
} from './styles';

type TEditPictureActions = 'chooseFromGallery' | 'removePicture';

interface IEditPictureModalProps {
  picture: string;
  isAvatar?: boolean;
  actions?: TEditPictureActions[];
  chooseFromGallery?: () => void;
  removePicture?: () => void;
  loaders?: Record<TEditPictureActions, boolean>;
  width?: number;
  height?: number;
  // takePicture: () => void;
}

const EditPictureModal: React.FC<IEditPictureModalProps> = ({
  chooseFromGallery,
  picture,
  removePicture,
  actions,
  isAvatar,
  loaders,
  width = 72,
  height = 100,
}) => {
  const {t} = useTranslation();

  const getPreviewSource = (image: string): string => {
    if (!image) {
      return '';
    }

    if (image && image.includes('http')) {
      return image;
    }

    return `data:image/jpeg;base64,${image}`;
  };

  return (
    <ModalContainerStyle>
      <ModalContainerTitleStyle>
        <ImagePreviewStyle
          onError={() => {}}
          width={width}
          height={height}
          source={getPreviewSource(picture)}
        />

        {isAvatar ? (
          <Typography variant="h5" color="black3">
            {t('modals.editPicture.titleAvatar')}
          </Typography>
        ) : (
          <Typography variant="h5" color="black3">
            {t('modals.editPicture.titlePhoto')}
          </Typography>
        )}
      </ModalContainerTitleStyle>
      {actions && (
        <ModalContainerActionsStyle>
          {actions.includes('chooseFromGallery') && (
            <Button
              colorScheme="default"
              variant="ghost"
              title="modals.editPicture.buttons.chooseFromGalery"
              onPress={chooseFromGallery}
              loading={loaders?.chooseFromGallery}
              suffix={
                <Icons.GalleryIcon width={18} height={18} color="black2" />
              }
            />
          )}
          {actions.includes('chooseFromGallery') && (
            <Button
              variant="ghost"
              colorScheme="danger"
              title="modals.editPicture.buttons.removePhoto"
              onPress={removePicture}
              loading={loaders?.removePicture}
              suffix={
                <Icons.DeleteIcon
                  width={18}
                  height={18}
                  strokeWidth={2}
                  color="danger"
                />
              }
            />
          )}
        </ModalContainerActionsStyle>
      )}
    </ModalContainerStyle>
  );
};

export default EditPictureModal;
