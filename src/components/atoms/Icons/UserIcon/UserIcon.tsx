import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IUserProps extends IIconProps {}

const UserIcon: React.FC<IUserProps> = ({
  width = 20,
  height = 20,
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
      <Svg width={width} height={height} viewBox="0 0 35 36" fill="none">
        <Path
          d="M30.1663 32.2501V29.0834C30.1663 27.4037 29.4991 25.7928 28.3114 24.6051C27.1236 23.4173 25.5127 22.7501 23.833 22.7501H11.1663C9.48664 22.7501 7.87573 23.4173 6.688 24.6051C5.50027 25.7928 4.83301 27.4037 4.83301 29.0834V32.2501"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.4993 16.4167C20.9972 16.4167 23.8327 13.5812 23.8327 10.0834C23.8327 6.58559 20.9972 3.75006 17.4993 3.75006C14.0015 3.75006 11.166 6.58559 11.166 10.0834C11.166 13.5812 14.0015 16.4167 17.4993 16.4167Z"
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

export default UserIcon;
