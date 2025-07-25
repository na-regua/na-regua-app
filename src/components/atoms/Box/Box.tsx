import {normalShadowStyle, softShadowStyle, strongShadowStyle} from '@/utils';
import React, {useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import Animated, {AnimatedProps} from 'react-native-reanimated';

export interface IBoxProps extends AnimatedProps<ViewProps> {
  direction?: ViewStyle['flexDirection'];
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  maxWidth?: ViewStyle['maxWidth'];
  maxHeight?: ViewStyle['maxHeight'];
  backgroundColor?: ViewStyle['backgroundColor'];
  padding?: ViewStyle['padding'];
  margin?: ViewStyle['margin'];
  gap?: ViewStyle['gap'];
  borderRadius?: ViewStyle['borderRadius'];
  overflow?: ViewStyle['overflow'];
  flex?: ViewStyle['flex'];
  position?: ViewStyle['position'];
  positions?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  paddings?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    vertical?: number;
    horizontal?: number;
  };
  shadow?: 'soft' | 'normal' | 'strong';
  zIndex?: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const Box: React.FC<IBoxProps> = ({
  children,
  direction = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  alignSelf = 'auto',
  width = 'auto',
  height = 'auto',
  maxWidth = 'auto',
  maxHeight = 'auto',
  backgroundColor = 'transparent',
  padding = 0,
  margin = 0,
  gap = 0,
  borderRadius = 0,
  flex,
  paddings,
  positions,
  position,
  shadow,
  overflow,
  zIndex,
  style,
  ...viewProps
}) => {
  const shadowStyle: ViewStyle = useMemo(() => {
    if (shadow === 'soft') {
      return softShadowStyle;
    }

    if (shadow === 'normal') {
      return normalShadowStyle;
    }

    if (shadow === 'strong') {
      return strongShadowStyle;
    }

    return {};
  }, [shadow]);

  const viewStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: direction,
      justifyContent,
      alignItems,
      alignSelf,
      width,
      height,
      maxWidth,
      maxHeight,
      backgroundColor,
      padding,
      margin,
      borderRadius,
      gap,
      flex,
      paddingBottom: paddings?.vertical || paddings?.bottom,
      paddingLeft: paddings?.horizontal || paddings?.left,
      paddingRight: paddings?.horizontal || paddings?.right,
      paddingTop: paddings?.vertical || paddings?.top,
      position,
      top: positions?.top,
      right: positions?.right,
      bottom: positions?.bottom,
      left: positions?.left,
      shadowStyle,
      overflow,
      zIndex,
    }),
    [
      zIndex,
      position,
      positions,
      paddings,
      flex,
      direction,
      justifyContent,
      alignItems,
      alignSelf,
      width,
      height,
      maxWidth,
      maxHeight,
      backgroundColor,
      padding,
      margin,
      borderRadius,
      gap,
      shadowStyle,
      overflow,
    ],
  );

  return (
    <AnimatedView {...viewProps} style={[viewStyle, style]}>
      {children}
    </AnimatedView>
  );
};

export {Box};
