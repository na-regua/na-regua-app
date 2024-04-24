import React = require('react');
import {ImagePickerType} from '@/app/models';
import {EditPictureModal} from '@/components/modals';
import {Colors} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';
import Modal from '../Modal/Modal';

const ImagePicker: ImagePickerType = require('react-native-image-picker');

interface IFileUploadProps {
  limit: number;
  initialMiniatures?: string[];
  onFileUpload?: (files: Asset[]) => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  onFileUpload,
  initialMiniatures,
  limit,
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

      const miniatureImages = resultAssets.map((asset: Asset) =>
        asset.base64 ? asset.base64 : '',
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

      setAssets(resultAssets);

      if (onFileUpload) {
        onFileUpload(resultAssets);
      }
    }

    if (editPictureModalRef.current) {
      editPictureModalRef.current.dismiss();
    }
  };

  const removePicture = (pictureIndex: number) => {
    const newFiles = miniatures.filter((_, index) => index !== pictureIndex);
    const newAssets = assets.filter((_, index) => index !== pictureIndex);

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

      setAssets(resultAssets);

      if (onFileUpload) {
        onFileUpload(resultAssets);
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
    <View style={styles.pickerWrapper}>
      {miniatures.map((image: string, index: number) => (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.previewWrapper}
          key={index}
          onPress={() => onEditPicture(image, index)}>
          <Image source={getPreviewSource(image)} style={styles.preview} />
        </TouchableOpacity>
      ))}
      {miniatures.length !== limit && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.picker}
          onPress={getLibraryFiles}>
          <Icons.CameraIcon
            color="default"
            width={24}
            height={24}
            strokeWidth={2}
          />
        </TouchableOpacity>
      )}
      <Modal ref={editPictureModalRef} height={292}>
        {selectedToEdit && (
          <EditPictureModal
            picture={selectedToEdit.picture}
            actions={['chooseFromGallery', 'removePicture']}
            chooseFromGallery={() => overridePicture(selectedToEdit.index)}
            removePicture={() => removePicture(selectedToEdit.index)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  picker: {
    minHeight: 100,
    maxWidth: 72,
    flex: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.border,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.default,
    borderRadius: 4,
  },
  preview: {
    width: 72,
    height: 100,
    resizeMode: 'cover',
  },
  previewWrapper: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.main,
    borderRadius: 4,
  },
});

export default FileUpload;
