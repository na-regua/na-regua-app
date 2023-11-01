import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IMinusIconProps extends IIconProps {}

const MinusIcon: React.FC<IMinusIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  strokeWidth = 1.5,
  customColor,
  clickable,
  onPress,
  style,
  disabled,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.iconWrapper, style]}
      onPress={onPress}
      disabled={!clickable || disabled}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M4.16699 10H15.8337"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MinusIcon;
