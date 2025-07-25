import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Svg} from 'react-native-svg';
import {AnimatedPath, IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IScheduleIconProps extends IIconProps {}

const ReceiptIcon: React.FC<IScheduleIconProps> = ({
  width = 25,
  height = 24,
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
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${25} ${24}`}
        fill="none">
        <AnimatedPath
          opacity="0.3"
          d="M5.375 19.09H19.375V4.91003H5.375V19.09ZM6.375 7.00003H18.375V9.00003H6.375V7.00003ZM6.375 11H18.375V13H6.375V11ZM6.375 15H18.375V17H6.375V15Z"
          fill={getColor}
        />
        <AnimatedPath
          d="M19.875 3.5L18.375 2L16.875 3.5L15.375 2L13.875 3.5L12.375 2L10.875 3.5L9.375 2L7.875 3.5L6.375 2L4.875 3.5L3.375 2V22L4.875 20.5L6.375 22L7.875 20.5L9.375 22L10.875 20.5L12.375 22L13.875 20.5L15.375 22L16.875 20.5L18.375 22L19.875 20.5L21.375 22V2L19.875 3.5ZM19.375 19.09H5.375V4.91H19.375V19.09ZM6.375 15H18.375V17H6.375V15ZM6.375 11H18.375V13H6.375V11ZM6.375 7H18.375V9H6.375V7Z"
          fill={getColor}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ReceiptIcon;
