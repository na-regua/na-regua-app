import {Metrics} from '@/theme';
import React, {useEffect} from 'react';
import {View, ViewStyle} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Box} from '../Box/Box';
import Typography from '../Typography/Typography';
import {AvatarStyled, ContainerStyle, IconWrapperStyle} from './styles';

interface IMenuItemProps {
  avatar?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  clickable?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  collapsed?: boolean;
  actionsWidth?: number;
  width?: number;

  suffix?: React.ReactNode;
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
  collapsed,
  actionsWidth,
  width = Metrics.smPadding,
  suffix,
}) => {
  const originalWidth = width;
  const gap = 12;

  const sharedValue = useSharedValue(originalWidth);

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: sharedValue.value,
    };
  });

  useEffect(() => {
    if (width !== originalWidth) {
      sharedValue.value = width;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (actionsWidth) {
      if (collapsed) {
        sharedValue.value = withTiming(originalWidth - (actionsWidth + gap), {
          duration: 100,
        });
      }
    }

    if (!collapsed) {
      sharedValue.value = withTiming(originalWidth, {duration: 100});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed]);

  return (
    <ContainerStyle
      style={[style, widthStyle]}
      activeOpacity={0.8}
      disabled={!clickable}
      onLongPress={() => onLongPress && onLongPress()}
      onPress={() => onPress && onPress()}>
      <Box
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={Metrics.unitX2}>
        {avatar && (
          <AvatarStyled
            source={avatar}
            onError={() => {}}
            size={42}
            imageStyle={{borderRadius: 21}}
          />
        )}

        {icon && <IconWrapperStyle>{icon}</IconWrapperStyle>}

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
      </Box>

      <>{!!suffix && suffix}</>
    </ContainerStyle>
  );
};

export default MenuItem;
