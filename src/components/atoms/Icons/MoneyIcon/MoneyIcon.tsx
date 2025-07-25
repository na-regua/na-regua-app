import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IMoneyIconProps extends IIconProps {}

const MoneyIcon: React.FC<IMoneyIconProps> = ({
  width = 25,
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
      <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
        <Path
          d="M10.375 1V23"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.375 1V23"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.375 5H9.875C8.94674 5 8.0565 5.36875 7.40013 6.02513C6.74375 6.6815 6.375 7.57174 6.375 8.5C6.375 9.42826 6.74375 10.3185 7.40013 10.9749C8.0565 11.6313 8.94674 12 9.875 12H14.875C15.8033 12 16.6935 12.3687 17.3499 13.0251C18.0063 13.6815 18.375 14.5717 18.375 15.5C18.375 16.4283 18.0063 17.3185 17.3499 17.9749C16.6935 18.6313 15.8033 19 14.875 19H6.375"
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

export default MoneyIcon;
