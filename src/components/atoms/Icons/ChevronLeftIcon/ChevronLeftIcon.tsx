import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IChevronLeftIconProps extends IIconProps {}

const ChevronLeftIcon: React.FC<IChevronLeftIconProps> = ({
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
          d="M12 15L7 10L12 5"
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
