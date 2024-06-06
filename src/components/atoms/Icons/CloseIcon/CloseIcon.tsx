import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface ICloseIconProps extends IIconProps {}

const CloseIcon: React.FC<ICloseIconProps> = ({
  width = 20,
  height = 20,
  strokeWidth = 2,
  color = 'default',
  customColor,
  disabled,
  onPress,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <IconTouchableViewStyle disabled={disabled} onPress={onPress}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M15 5L5 15"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M5 5L15 15"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default CloseIcon;
