import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface ITimeIconProps extends IIconProps {}

const TimeIcon: React.FC<ITimeIconProps> = ({
  width = 25,
  height = 24,
  strokeWidth = 2,
  color = 'default',
  customColor,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <View style={styles.iconWrapper}>
      <Svg width={width} height={height} viewBox="0 0 27 26" fill="none">
        <Path
          d="M14 24.5C20.3513 24.5 25.5 19.3513 25.5 13C25.5 6.64873 20.3513 1.5 14 1.5C7.64873 1.5 2.5 6.64873 2.5 13C2.5 19.3513 7.64873 24.5 14 24.5Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 6.09985V12.9999L18.6 15.2999"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimeIcon;
