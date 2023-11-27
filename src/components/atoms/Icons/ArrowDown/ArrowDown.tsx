import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IArrowDownIconProps extends IIconProps {}

const ArrowDownIcon: React.FC<IArrowDownIconProps> = ({
  width = 24,
  height = 24,
  strokeWidth = 1.5,
  color = 'default',
  customColor,
  disabled,
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
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 9.52454L12 15.5245L18 9.52454"
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

export default ArrowDownIcon;
