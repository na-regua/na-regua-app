import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Line, Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IEyeIconProps extends IIconProps {
  closed?: boolean;
}

const EyeIcon: React.FC<IEyeIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  strokeWidth = 1.5,
  customColor,
  closed,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <View style={styles.iconWrapper}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M1 12.7062C1 12.7062 5 4.70624 12 4.70624C19 4.70624 23 12.7062 23 12.7062C23 12.7062 19 20.7062 12 20.7062C5 20.7062 1 12.7062 1 12.7062Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 15.7062C13.6569 15.7062 15 14.3631 15 12.7062C15 11.0494 13.6569 9.70624 12 9.70624C10.3431 9.70624 9 11.0494 9 12.7062C9 14.3631 10.3431 15.7062 12 15.7062Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        {closed && (
          <Line
            x1="1.46967"
            y1="22.1759"
            x2="21.2687"
            y2="2.37692"
            stroke={getColor}
            strokeWidth={strokeWidth}
          />
        )}
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

export default EyeIcon;
