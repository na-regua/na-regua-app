import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Ellipse, Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IPenteIconProps extends IIconProps {}

const PenteIcon: React.FC<IPenteIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  strokeWidth = 1.5,
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
          d="M6.4996 15.5294L6.14911 15.8799C5.36806 16.6609 5.36806 17.9273 6.14911 18.7083L8.79372 21.3529C9.28103 21.8402 9.28102 22.6303 8.79371 23.1176V23.1176C8.3064 23.6049 7.51632 23.6049 7.02901 23.1176L2.26675 18.3554C1.4857 17.5743 1.4857 16.308 2.26675 15.5269L7.91137 9.88234M6.4996 15.5294L11.0878 20.1176M6.4996 15.5294L7.91136 14.1176M7.91136 14.1176L12.4996 18.7059M7.91136 14.1176L9.32313 12.7059M9.32313 12.7059L13.9114 17.2941M9.32313 12.7059L10.7349 11.2941M10.7349 11.2941L15.3231 15.8823M10.7349 11.2941L12.1467 9.88234M12.1467 9.88234L16.7349 14.4706M12.1467 9.88234L13.5584 8.47057M13.5584 8.47057L18.1467 13.0588M13.5584 8.47057L14.9702 7.0588M14.9702 7.0588L19.5584 11.647M14.9702 7.0588L16.382 5.64704M16.382 5.64704V5.64704C17.1617 4.86734 18.4258 4.86734 19.2055 5.64704L21.8525 8.2941C22.3399 8.78141 23.1299 8.78141 23.6172 8.2941V8.2941C24.1046 7.80679 24.1046 7.0167 23.6172 6.52939L18.855 1.76713C18.0739 0.986084 16.8076 0.986086 16.0266 1.76713L10.7349 7.05881M16.382 5.64704L20.9702 10.2353"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <Ellipse
          cx="9.32307"
          cy="8.47058"
          rx="0.499134"
          ry="0.499134"
          transform="rotate(-45 9.32307 8.47058)"
          fill={getColor}
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

export default PenteIcon;
