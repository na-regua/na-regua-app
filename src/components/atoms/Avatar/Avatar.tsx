import React, {useState} from 'react';

import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';
import {
  AvatarContentStyle,
  AvatarPreviewStyle,
  OffsetContainerStyle,
} from './styles';

const ImagePicker = require('react-native-image-picker');

interface IAvatarProps {
  size?: number;
  iconSize?: number;
  onAvatarChange?: (file: Asset) => void;
  borderOffset?: number;
  initialAvatar?: string;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 72,
  iconSize = 32,
  borderOffset = 12,
  onAvatarChange,
  initialAvatar = undefined,
}) => {
  const [preview, setPreview] = useState<string | undefined>(initialAvatar);

  const getFile = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
    });

    if (result && result.assets && result.assets[0]) {
      const newAvatar: Asset = result.assets[0];

      if (newAvatar.base64) {
        setPreview(newAvatar.base64);
      }

      if (onAvatarChange) {
        onAvatarChange(newAvatar);
      }
    }
  };

  return (
    <OffsetContainerStyle active={!!preview} size={size + borderOffset}>
      <AvatarContentStyle size={size} activeOpacity={0.8} onPress={getFile}>
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
            source={{uri: `data:image/jpeg;base64,${preview}`}}
          />
        )}
      </AvatarContentStyle>
    </OffsetContainerStyle>
  );
};

export default Avatar;
