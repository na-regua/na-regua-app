import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IBellIconProps extends IIconProps {
  fill?: boolean;
}

const BellIcon: React.FC<IBellIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  strokeWidth = 1.5,
  customColor,
  fill,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <View style={styles.iconWrapper}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={fill ? getColor : 'none'}>
        <Path
          d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
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

export default BellIcon;
