import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IMoonIconProps extends IIconProps {}

const MoonIcon: React.FC<IMoonIconProps> = ({
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
          d="M17.5004 10.6583C17.3693 12.0768 16.837 13.4287 15.9656 14.5557C15.0943 15.6826 13.92 16.5382 12.5802 17.0221C11.2403 17.5061 9.79039 17.5984 8.39999 17.2884C7.00959 16.9784 5.73623 16.2788 4.72893 15.2715C3.72162 14.2642 3.02202 12.9908 2.712 11.6004C2.40197 10.21 2.49434 8.76007 2.97829 7.42025C3.46224 6.08042 4.31776 4.90614 5.44475 4.03479C6.57174 3.16345 7.92357 2.63109 9.34207 2.5C8.51158 3.62356 8.11195 5.00787 8.21585 6.40118C8.31975 7.79448 8.92029 9.10422 9.90824 10.0922C10.8962 11.0801 12.2059 11.6807 13.5992 11.7846C14.9925 11.8885 16.3768 11.4888 17.5004 10.6583Z"
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

export default MoonIcon;
