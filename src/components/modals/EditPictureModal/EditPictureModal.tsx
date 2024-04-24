import {Button, Icons, Typography} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ImageSourcePropType} from 'react-native';
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
  // takePicture: () => void;
}

const EditPictureModal: React.FC<IEditPictureModalProps> = ({
  chooseFromGallery,
  picture,
  removePicture,
  actions,
  isAvatar,
}) => {
  const {t} = useTranslation();

  const getPreviewSource = (image: string): ImageSourcePropType => {
    if (!image) {
      return {uri: ''};
    }

    if (image && image.includes('http')) {
      return {uri: image};
    }

    return {uri: `data:image/jpeg;base64,${image}`};
  };

  return (
    <ModalContainerStyle>
      <ModalContainerTitleStyle>
        <ImagePreviewStyle source={getPreviewSource(picture)} />

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
              suffix={
                <Icons.GaleryIcon width={18} height={18} color="black2" />
              }
            />
          )}
          {actions.includes('chooseFromGallery') && (
            <Button
              variant="ghost"
              colorScheme="danger"
              title="modals.editPicture.buttons.removePhoto"
              onPress={removePicture}
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

export {EditPictureModal};
