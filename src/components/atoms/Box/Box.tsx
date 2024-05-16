import React, {PropsWithChildren, useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

export interface IBoxProps extends PropsWithChildren {
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
  viewProps?: ViewProps;
}

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
  viewProps,
}) => {
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
    }),
    [
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
    ],
  );

  return (
    <View style={viewStyle} {...viewProps}>
      {children}
    </View>
  );
};

export {Box};
