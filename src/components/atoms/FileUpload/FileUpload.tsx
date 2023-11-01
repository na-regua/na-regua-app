import React = require('react');
import {Colors} from '@/theme';
import {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';

const ImagePicker = require('react-native-image-picker');

interface IFileUploadProps {
  limit: number;
  assets: Asset[];
  onFileUpload?: (files: Asset[]) => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  onFileUpload,
  assets,
  limit,
}) => {
  const [miniatures, setMiniatures] = useState<string[]>([]);

  const getLibraryFiles = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: limit - assets.length,
      quality: 0.4,
    });

    if (result && result.assets) {
      const resultAssets: Asset[] = result.assets;

      const newAssets = [...assets, ...resultAssets];

      const miniatureImages = newAssets.map((asset: Asset) =>
        asset.base64 ? asset.base64 : '',
      );

      if (miniatureImages.length > 0) {
        setMiniatures(miniatureImages);
      }

      if (onFileUpload) {
        onFileUpload(newAssets);
      }
    }
  };

  return (
    <View style={styles.pickerWrapper}>
      {miniatures.map((image: string, index: number) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.previewWrapper}
          key={index}>
          <Image
            source={{uri: `data:image/jpeg;base64,${image}`}}
            style={styles.preview}
          />
        </TouchableOpacity>
      ))}
      {assets.length !== limit && (
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
