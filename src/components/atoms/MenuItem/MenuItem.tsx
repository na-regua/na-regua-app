import React, {useState} from 'react';
import {Image, View, ViewStyle} from 'react-native';
import Typography from '../Typography/Typography';
import {ContainerStyle, IconWrapperStyle, menuItemStyles} from './styles';

interface IMenuItemProps {
  avatar?: string;
  icon?: React.ReactNode;
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
  icon,
}) => {
  const [pressed, setPressed] = useState(false);

  const onPressIn = () => {
    setPressed(true);
  };

  const onPressOut = () => {
    setPressed(false);
  };

  return (
    <ContainerStyle
      style={style}
      pressed={pressed}
      activeOpacity={1}
      disabled={!clickable}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}>
      {avatar && <Image source={{uri: avatar}} style={menuItemStyles.avatar} />}
      {icon && (
        <IconWrapperStyle style={menuItemStyles.avatar}>
          {icon}
        </IconWrapperStyle>
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
    </ContainerStyle>
  );
};

export default MenuItem;
