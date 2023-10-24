import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IDeleteIconProps extends IIconProps {}

const DeleteIcon: React.FC<IDeleteIconProps> = ({
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
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <G>
          <Path
            d="M10.0001 19.0909C15.0209 19.0909 19.091 15.0208 19.091 10C19.091 4.97923 15.0209 0.909088 10.0001 0.909088C4.97932 0.909088 0.90918 4.97923 0.90918 10C0.90918 15.0208 4.97932 19.0909 10.0001 19.0909Z"
            stroke={getColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12.727 7.27274L7.27246 12.7273"
            stroke={getColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M7.27246 7.27274L12.727 12.7273"
            stroke={getColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        {/* <Defs>
          <ClipPath>
            <Rect width={width} height={height} fill={getColor} />
          </ClipPath>
        </Defs> */}
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

export default DeleteIcon;
