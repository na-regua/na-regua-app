import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IMarketIconProps extends IIconProps {}

const MarketIcon: React.FC<IMarketIconProps> = ({
  width = 22,
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
      <Svg width={width} height={height} viewBox="0 0 22 24" fill="none">
        <Path
          d="M4.45437 1.09082L1.18164 5.45446V20.7272C1.18164 21.3058 1.41151 21.8608 1.82068 22.27C2.22985 22.6791 2.7848 22.909 3.36346 22.909H18.6362C19.2148 22.909 19.7698 22.6791 20.179 22.27C20.5881 21.8608 20.818 21.3058 20.818 20.7272V5.45446L17.5453 1.09082H4.45437Z"
          stroke={getColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M1.18164 5.4541H20.818"
          stroke={getColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M15.364 9.81836C15.364 10.9757 14.9043 12.0856 14.0859 12.9039C13.2676 13.7223 12.1577 14.182 11.0004 14.182C9.84305 14.182 8.73314 13.7223 7.9148 12.9039C7.09646 12.0856 6.63672 10.9757 6.63672 9.81836"
          stroke={getColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
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

export default MarketIcon;
