import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface LeftIconProps extends IIconProps {}

const LeftIcon: React.FC<LeftIconProps> = ({
  width = 16,
  height = 16,
  color = 'default',
  customColor,
  disabled,
  strokeWidth = 1.5,
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
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path
          d="M3.81275 7.94478L3.81358 7.94413L11.2862 2.10762V2.65143L4.94094 7.60599L4.43614 8.00015L4.94101 8.39422L11.2862 13.347V13.8907L3.81358 8.05424L3.81275 8.0536C3.80446 8.04715 3.79775 8.0389 3.79314 8.02947C3.78853 8.02004 3.78613 8.00968 3.78613 7.99919C3.78613 7.98869 3.78853 7.97833 3.79314 7.9689C3.79776 7.95947 3.80446 7.95122 3.81275 7.94478Z"
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

export {LeftIcon};
