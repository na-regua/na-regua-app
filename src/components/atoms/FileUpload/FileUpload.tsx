import React = require('react');
import {Colors} from '@/theme';
import {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';

const ImagePicker = require('react-native-image-picker');

interface IFileUploadProps {
  limit: number;
  initialMiniatures: string[];
  onFileUpload?: (files: string[]) => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  onFileUpload,
  initialMiniatures,
  limit,
}) => {
  const [miniatures, setMiniatures] = useState<string[]>(initialMiniatures);

  const getLibraryFiles = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: limit - miniatures.length,
      quality: 0.4,
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

      if (onFileUpload) {
        onFileUpload(files);
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
          activeOpacity={0.8}
          style={styles.previewWrapper}
          key={index}>
          <Image source={getPreviewSource(image)} style={styles.preview} />
        </TouchableOpacity>
      ))}
      {miniatures.length !== limit && (
        <TouchableOpacity style={styles.picker} onPress={getLibraryFiles}>
          <Icons.CameraIcon
            color="default"
            width={24}
            height={24}
            strokeWidth={2}
          />
        </TouchableOpacity>
      )}
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
