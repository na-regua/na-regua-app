import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IScheduleIconProps extends IIconProps {}

const ScheduleIcon: React.FC<IScheduleIconProps> = ({
  width = 26,
  height = 24,
  strokeWidth = 1.5,
  color = 'default',
  customColor,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <View style={styles.iconWrapper}>
      <Svg width={width} height={height} viewBox="0 0 26 24" fill="none">
        <Path
          d="M21.4022 3.38184H4.29112C2.94109 3.38184 1.84668 4.36681 1.84668 5.58184V20.9818C1.84668 22.1969 2.94109 23.1818 4.29112 23.1818H21.4022C22.7523 23.1818 23.8467 22.1969 23.8467 20.9818V5.58184C23.8467 4.36681 22.7523 3.38184 21.4022 3.38184Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.7354 1.18188V5.58189"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.95801 1.18188V5.58189"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.84668 9.98193H23.8467"
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

export default ScheduleIcon;
