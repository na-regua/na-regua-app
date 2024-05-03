import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IChevronRightIconProps extends IIconProps {}

const ChevronRightIcon: React.FC<IChevronRightIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  customColor,
  disabled = true,
  strokeWidth = 1.5,
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
          d="M7.5 15.2782L12.5 10.2782L7.5 5.2782"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ChevronRightIcon;
