import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IChevronLeftIconProps extends IIconProps {}

const ChevronLeftIcon: React.FC<IChevronLeftIconProps> = ({
  width = 24,
  height = 24,
  color = 'default',
  customColor,
  strokeWidth = 2.5,
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
      activeOpacity={0.6}
      disabled={disabled}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 20L9 12L15 4"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ChevronLeftIcon;
