import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IPenteIconProps extends IIconProps {}

const PenteIcon: React.FC<IPenteIconProps> = ({
  width = 24,
  height = 24,
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
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M5.99999 15.5294L5.6495 15.8799C4.86845 16.6609 4.86845 17.9273 5.6495 18.7083L8.29411 21.3529C8.78142 21.8402 8.78142 22.6303 8.29411 23.1176V23.1176C7.8068 23.6049 7.01672 23.6049 6.52941 23.1176L1.76715 18.3554C0.986099 17.5743 0.986099 16.308 1.76715 15.5269L15.527 1.76714C16.308 0.986091 17.5743 0.986088 18.3554 1.76714L23.1176 6.5294C23.605 7.01671 23.605 7.80679 23.1176 8.2941V8.2941C22.6303 8.78141 21.8402 8.78141 21.3529 8.2941L18.7059 5.64704C17.9262 4.86735 16.662 4.86735 15.8823 5.64704V5.64704M5.99999 15.5294L10.5882 20.1176M5.99999 15.5294L7.41176 14.1176M7.41176 14.1176L12 18.7059M7.41176 14.1176L8.82352 12.7059M8.82352 12.7059L13.4118 17.2941M8.82352 12.7059L10.2353 11.2941M10.2353 11.2941L14.8235 15.8823M10.2353 11.2941L11.6471 9.88234M11.6471 9.88234L16.2353 14.4706M11.6471 9.88234L13.0588 8.47057M13.0588 8.47057L17.6471 13.0588M13.0588 8.47057L14.4706 7.05881M14.4706 7.05881L19.0588 11.647M14.4706 7.05881L15.8823 5.64704M15.8823 5.64704L20.4706 10.2353"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke-linejoin="round"
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
