import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IChevronDoubleLeftIconProps extends IIconProps {}

const ChevronDoubleLeftIcon: React.FC<IChevronDoubleLeftIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  customColor,
  strokeWidth = 1.5,
  disabled = true,
  onPress,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <IconTouchableViewStyle
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M9 15.2782L4 10.2782L9 5.2782"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 15.2782L11 10.2782L16 5.2782"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ChevronDoubleLeftIcon;
