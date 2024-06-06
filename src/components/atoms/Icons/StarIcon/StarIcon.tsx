import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IStarIconProps extends IIconProps {
  filled?: boolean;
  half?: boolean;
}

const StarIcon: React.FC<IStarIconProps> = ({
  width = 16,
  height = 16,
  strokeWidth = 1.5,
  color = 'warning',
  customColor,
  disabled,
  onPress,
  filled = true,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <IconTouchableViewStyle disabled={disabled} onPress={onPress}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path
          d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66659 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={filled ? getColor : 'transparent'}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default StarIcon;
