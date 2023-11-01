import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface ISunIconProps extends IIconProps {}

const SunIcon: React.FC<ISunIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  strokeWidth = 1.5,
  customColor,
  clickable,
  onPress,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.iconWrapper}
      onPress={onPress}
      disabled={!clickable}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M9.99967 14.1668C12.3009 14.1668 14.1663 12.3013 14.1663 10.0002C14.1663 7.69898 12.3009 5.8335 9.99967 5.8335C7.69849 5.8335 5.83301 7.69898 5.83301 10.0002C5.83301 12.3013 7.69849 14.1668 9.99967 14.1668Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 0.833496V2.50016"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 17.5V19.1667"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.5166 3.5166L4.69993 4.69993"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.2998 15.2998L16.4831 16.4831"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0.833008 10H2.49967"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.5 10H19.1667"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.5166 16.4831L4.69993 15.2998"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.2998 4.69993L16.4831 3.5166"
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

export default SunIcon;
