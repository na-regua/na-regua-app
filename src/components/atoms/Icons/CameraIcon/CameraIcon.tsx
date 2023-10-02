import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface ICameraIconProps extends IIconProps {}

const CameraIcon: React.FC<ICameraIconProps> = ({
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
      <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
        <Path
          d="M23 19.7062C23 20.2367 22.7893 20.7454 22.4142 21.1205C22.0391 21.4955 21.5304 21.7062 21 21.7062H3C2.46957 21.7062 1.96086 21.4955 1.58579 21.1205C1.21071 20.7454 1 20.2367 1 19.7062V8.70624C1 8.1758 1.21071 7.6671 1.58579 7.29202C1.96086 6.91695 2.46957 6.70624 3 6.70624H7L9 3.70624H15L17 6.70624H21C21.5304 6.70624 22.0391 6.91695 22.4142 7.29202C22.7893 7.6671 23 8.1758 23 8.70624V19.7062Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 17.7062C14.2091 17.7062 16 15.9154 16 13.7062C16 11.4971 14.2091 9.70624 12 9.70624C9.79086 9.70624 8 11.4971 8 13.7062C8 15.9154 9.79086 17.7062 12 17.7062Z"
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

export default CameraIcon;
