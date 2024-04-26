import {FileUpload, Modal, Typography} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageSourcePropType} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

import {FilesService} from '@/app/api';
import {IFile} from '@/app/models';
import {EditPictureModal} from '@/components/modals';
import {createNotification, getCurrentUser} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AxiosError} from 'axios';
import {
  CardGroupStyle,
  CardStyle,
  FileUploadRowStyle,
  ImagePreview,
  PreviewWrapperStyle,
} from './styles';

const ImagePicker = require('react-native-image-picker');

const UpdateBarberThumbs = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {barber} = useSelector((state: RootState) => state.auth);

  const [selectedToEdit, setSelectedToEdit] = useState<IFile | undefined>(
    undefined,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isOverriding, setIsOverriding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const editPictureModalRef = useRef<BottomSheetModal>(null);

  const THUMB_LIMIT = 3;
  const uploadLimit = useMemo(
    () => THUMB_LIMIT - (barber?.thumbs.length || 0),
    [barber],
  );

  const onAddThumb = async (files: Asset[]) => {
    try {
      setIsUploading(true);

      const res = await FilesService.uploadBarberThumbs(files);

      if (res) {
        await dispatch(getCurrentUser());
      }

      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);

      if (error instanceof AxiosError) {
        if (error.response?.data && error.response?.data.message) {
          const {message} = error.response?.data;
          if (message) {
            dispatch(
              createNotification({
                id: 'send-whatsapp-code-error',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  const showEditPictureModal = (file: IFile) => {
    setSelectedToEdit(file);

    editPictureModalRef.current?.present();
  };

  const getPreviewSource = (image: string): ImageSourcePropType => {
    if (!image) {
      return {uri: ''};
    }

    if (image && image.includes('http')) {
      return {uri: image};
    }

    return {uri: `data:image/jpeg;base64,${image}`};
  };

  const overrideThumb = async (thumbId: string) => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1,
        quality: 0.8,
      });

      if (result && result.assets && result.assets[0]) {
        const newFile: Asset = result.assets[0];

        setIsOverriding(true);

        const res = await FilesService.updateBarberThumbFile(thumbId, newFile);

        if (res) {
          await dispatch(getCurrentUser());

          editPictureModalRef.current?.dismiss();
        }

        setIsOverriding(false);
      }
    } catch (error) {
      setIsOverriding(false);

      if (error instanceof AxiosError) {
        if (error.response?.data && error.response?.data.message) {
          const {message} = error.response?.data;
          if (message) {
            dispatch(
              createNotification({
                id: 'send-whatsapp-code-error',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  const removeThumb = async (thumbId: string) => {
    try {
      setIsRemoving(true);

      const res = await FilesService.deleteBarberThumb(thumbId);

      if (res) {
        await dispatch(getCurrentUser());

        if (editPictureModalRef.current) {
          editPictureModalRef.current.dismiss();
        }
      }

      setIsRemoving(false);
    } catch (error) {
      setIsRemoving(false);
    }
  };

  if (!barber) {
    return null;
  }

  return (
    <CardGroupStyle>
      <Typography variant="body1" color="black2">
        {t('barber.editUser.sections.pictures')}
      </Typography>
      <CardStyle>
        <FileUploadRowStyle>
          {barber.thumbs.length > 0 &&
            barber.thumbs.map(thumb => (
              <PreviewWrapperStyle
                onPress={() => showEditPictureModal(thumb)}
                key={thumb._id}
                activeOpacity={0.6}
                disabled={isUploading}>
                <ImagePreview
                  width={68}
                  height={96}
                  source={getPreviewSource(thumb.url)}
                />
              </PreviewWrapperStyle>
            ))}
          {barber.thumbs.length < 3 && (
            <FileUpload
              limit={uploadLimit}
              onFileUpload={onAddThumb}
              disabled={isOverriding || isRemoving}
              loading={isUploading}
            />
          )}
        </FileUploadRowStyle>
      </CardStyle>

      <Modal ref={editPictureModalRef} height={292}>
        {selectedToEdit && (
          <EditPictureModal
            picture={selectedToEdit.url}
            actions={['chooseFromGallery', 'removePicture']}
            chooseFromGallery={() => overrideThumb(selectedToEdit._id)}
            removePicture={() => removeThumb(selectedToEdit._id)}
            loaders={{
              removePicture: isRemoving,
              chooseFromGallery: isOverriding,
            }}
          />
        )}
      </Modal>
    </CardGroupStyle>
  );
};

export default UpdateBarberThumbs;
