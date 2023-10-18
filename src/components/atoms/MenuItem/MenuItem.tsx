import {Colors} from '@/theme';
import React, {useMemo, useState} from 'react';
import {Image, TouchableOpacity, View, ViewStyle} from 'react-native';
import Typography from '../Typography/Typography';
import {menuItemStyles} from './styles';

interface IMenuItemProps {
  avatar?: string;
  title?: string;
  description?: string;
  clickable?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  avatar,
  title,
  description,
  clickable = false,
  onPress,
  onLongPress,
  style,
}) => {
  const [pressed, setPressed] = useState(false);

  const onPressIn = () => {
    setPressed(true);
  };

  const onPressOut = () => {
    setPressed(false);
  };

  const pressedStyle: ViewStyle = useMemo(
    () =>
      pressed
        ? {backgroundColor: Colors.borderHover}
        : {backgroundColor: Colors.border},
    [pressed],
  );

  return (
    <TouchableOpacity
      style={[menuItemStyles.container, pressedStyle, style]}
      activeOpacity={1}
      disabled={!clickable}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}>
      {avatar && (
        <Image
          source={{uri: `data:image/jpeg;base64,${avatar}`}}
          style={menuItemStyles.avatar}
        />
      )}
      {(title || description) && (
        <View>
          {title && (
            <Typography variant="body1" color="black3">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="caption" color="black1">
              {description}
            </Typography>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MenuItem;
