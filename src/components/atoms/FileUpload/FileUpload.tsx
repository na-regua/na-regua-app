import React = require('react');
import {ImagePickerType} from '@/app/models';
import {EditPictureModal} from '@/components/modals';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import {
  ImagePreview,
  LoaderWrapperStyle,
  PickerStyle,
  PickerWrapperStyle,
  PreviewWrapperStyle,
} from './styles';
import {Colors} from '@/theme';

const ImagePicker: ImagePickerType = require('react-native-image-picker');

interface IFileUploadProps {
  limit: number;
  initialMiniatures?: string[];
  onFileUpload?: (files: Asset[]) => void;
  disabled?: boolean;
  loading?: boolean;
  width?: number;
  height?: number;
  previewBorder?: number;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  onFileUpload,
  initialMiniatures,
  limit,
  width = 72,
  height = 100,
  disabled,
  loading,
  previewBorder = 2,
}) => {
  const editPictureModalRef = useRef<BottomSheetModal>(null);

  const [selectedToEdit, setSelectedToEdit] = useState<{
    picture: string;
    index: number;
  }>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [miniatures, setMiniatures] = useState<string[]>(
    initialMiniatures || [],
  );

  const onEditPicture = (picture: string, index: number) => {
    setSelectedToEdit({picture, index});
    editPictureModalRef.current?.present();
  };

  const overridePicture = async (pictureIndex: number) => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result && result.assets) {
      const resultAssets: Asset[] = result.assets;

      const miniatureImages = resultAssets.map(
        (asset: Asset) => asset.base64 || '',
      );

      const newFile = miniatureImages[0];

      if (miniatures.length === 0) {
        setMiniatures([newFile]);
      }

      if (miniatures.length > 0) {
        const newFiles = miniatures.map((file, index) =>
          index === pictureIndex ? newFile : file,
        );

        setMiniatures(newFiles);
      }

      const newAssets = [...assets, ...resultAssets];

      setAssets(newAssets);

      if (onFileUpload) {
        onFileUpload(newAssets);
      }
    }

    if (editPictureModalRef.current) {
      editPictureModalRef.current.dismiss();
    }
  };

  const removePicture = (pictureToRemove: string) => {
    const newFiles = miniatures.filter(picture => picture !== pictureToRemove);
    const newAssets = assets.filter(
      picture => picture.base64 !== pictureToRemove,
    );

    setMiniatures(newFiles);
    setAssets(newAssets);

    if (onFileUpload) {
      onFileUpload(newAssets);
    }

    if (editPictureModalRef.current) {
      editPictureModalRef.current.dismiss();
    }
  };

  const getLibraryFiles = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: limit - miniatures.length,
      quality: 0.8,
    });

    if (result && result.assets) {
      const resultAssets: Asset[] = result.assets;

      const miniatureImages = resultAssets.map((asset: Asset) =>
        asset.base64 ? asset.base64 : '',
      );

      const files = [...miniatures, ...miniatureImages];

      if (miniatureImages.length > 0) {
        setMiniatures(files);
      }

      const newAssets = [...assets, ...resultAssets];

      setAssets(newAssets);

      if (onFileUpload) {
        onFileUpload(newAssets);
      }
    }
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

  return (
    <PickerWrapperStyle>
      {miniatures.map((image: string, index: number) => (
        <PreviewWrapperStyle
          activeOpacity={0.6}
          key={index}
          onPress={() => onEditPicture(image, index)}
          disabled={disabled}>
          <ImagePreview
            width={width - 2 * previewBorder}
            height={height - 2 * previewBorder}
            source={getPreviewSource(image)}
          />
          {loading && (
            <LoaderWrapperStyle>
              <Loader color={Colors.white3} size="64" strokeWidth={2.5} />
            </LoaderWrapperStyle>
          )}
        </PreviewWrapperStyle>
      ))}
      {miniatures.length !== limit && (
        <PickerStyle
          width={width}
          height={height}
          activeOpacity={0.6}
          onPress={getLibraryFiles}
          disabled={disabled}>
          <Icons.CameraIcon
            color="default"
            width={24}
            height={24}
            strokeWidth={2}
          />
        </PickerStyle>
      )}
      <Modal ref={editPictureModalRef} height={292}>
        {selectedToEdit && (
          <EditPictureModal
            picture={selectedToEdit.picture}
            actions={['chooseFromGallery', 'removePicture']}
            chooseFromGallery={() => overridePicture(selectedToEdit.index)}
            removePicture={() => removePicture(selectedToEdit.picture)}
          />
        )}
      </Modal>
    </PickerWrapperStyle>
  );
};

export default FileUpload;
