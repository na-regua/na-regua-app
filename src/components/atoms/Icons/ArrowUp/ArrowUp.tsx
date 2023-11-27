import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IArrowUpIconProps extends IIconProps {}

const ArrowUpIcon: React.FC<IArrowUpIconProps> = ({
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
          d="M18 15.5245L12 9.52454L6 15.5245"
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

export default ArrowUpIcon;
