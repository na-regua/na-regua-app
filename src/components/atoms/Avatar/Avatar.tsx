import React, {useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {Asset} from 'react-native-image-picker';
import Icons from '../Icons/Icons';
import {avatarWrapperStyle, styles} from './styles';

const ImagePicker = require('react-native-image-picker');

interface IAvatarProps {
  size?: number;
  iconSize?: number;
  onAvatarChange?: (file: Asset) => void;
}

const Avatar: React.FC<IAvatarProps> = ({
  size = 72,
  iconSize = 32,
  onAvatarChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const contentStyle = useMemo(
    () => [styles.avatarContent, {minWidth: size, minHeight: size}],
    [size],
  );

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

  const activeStatus = useMemo(
    () => (preview ? 'active' : 'default'),
    [preview],
  );

  return (
    <View style={avatarWrapperStyle[activeStatus]}>
      <TouchableOpacity
        style={contentStyle}
        activeOpacity={0.8}
        onPress={getFile}>
        {!preview && (
          <Icons.UserIcon
            width={iconSize}
            height={iconSize}
            color="default"
            strokeWidth={2}
          />
        )}
        {preview && (
          <Image
            source={{uri: `data:image/jpeg;base64,${preview}`}}
            style={contentStyle}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;
