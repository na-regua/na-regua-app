import React from 'react';

import {Colors} from '@/theme';
import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';
import Loader from '../Loader/Loader';
import {
  AvatarContentStyle,
  AvatarPreviewStyle,
  LoaderWrapperStyle,
  OffsetContainerStyle,
} from './styles';

const ImagePicker = require('react-native-image-picker');

interface IAvatarProps {
  size?: number;
  iconSize?: number;
  onAvatarChange?: (file: Asset) => void;
  borderOffset?: number;
  disabled?: boolean;
  preview?: string;
  loading?: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 72,
  iconSize = 32,
  borderOffset = 12,
  onAvatarChange,
  disabled,
  preview,
  loading,
}) => {
  const getFile = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
      quality: 0.4,
    });

    if (result && result.assets && result.assets[0]) {
      const newAvatar: Asset = result.assets[0];

      if (onAvatarChange) {
        onAvatarChange(newAvatar);
      }
    }
  };

  return (
    <OffsetContainerStyle active={!!preview} size={size + borderOffset}>
      <AvatarContentStyle
        size={size}
        activeOpacity={0.8}
        onPress={getFile}
        loading={loading}
        disabled={disabled || loading}>
        {!preview && (
          <Icons.UserIcon
            width={iconSize}
            height={iconSize}
            color="default"
            strokeWidth={2}
          />
        )}
        {preview && (
          <AvatarPreviewStyle
            size={size}
            source={{
              uri: preview,
            }}
          />
        )}
      </AvatarContentStyle>
      {loading && (
        <LoaderWrapperStyle>
          <Loader color={Colors.main} />
        </LoaderWrapperStyle>
      )}
    </OffsetContainerStyle>
  );
};

export default Avatar;
