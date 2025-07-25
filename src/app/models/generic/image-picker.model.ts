import {
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

export type ImagePickerType = {
  launchImageLibrary(
    options: ImageLibraryOptions,
    callback?: () => void,
  ): Promise<ImagePickerResponse>;
};
