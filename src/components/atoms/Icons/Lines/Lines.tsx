import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Circle, Path, Svg, Text} from 'react-native-svg';
import {IIconProps} from '../Icons';
import Typography from '../../Typography/Typography';

interface LinesIconProps extends IIconProps {}

const LinesIcon: React.FC<LinesIconProps> = ({
  width = 126,
  height = 4,
  color = 'main',
  customColor,
  disabled = true,
  strokeWidth = 2,
  onPress,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={styles.iconWrapper}>
      <Svg width={width} height={height} viewBox="0 0 126 4" fill="none">
        <Path
          d="M1.5 1.83691H49.5"
          stroke={getColor}
          strokeWidth={strokeWidth}
          stroke-linecap="round"
        />
        <Circle cx="63" cy="1.83691" r={strokeWidth} fill={getColor} />

        <Path
          d="M76.5 1.83691H124.5"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
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

export {LinesIcon};
