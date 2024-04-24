import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface ITimeIconProps extends IIconProps {}

const TimeTwotoneIcon: React.FC<ITimeIconProps> = ({
  width = 25,
  height = 24,
  strokeWidth = 2,
  color = 'default',
  customColor,
  disabled = true,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <IconTouchableViewStyle disabled={disabled}>
      <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
        <Path
          d="M12.875 22C18.3978 22 22.875 17.5228 22.875 12C22.875 6.47715 18.3978 2 12.875 2C7.35215 2 2.875 6.47715 2.875 12C2.875 17.5228 7.35215 22 12.875 22Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={getColor}
          fillOpacity={0.3}
        />
        <Path
          d="M12.875 5.99988V11.9999L16.875 13.9999"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default TimeTwotoneIcon;
