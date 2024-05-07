import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface ChevronUpIconProps extends IIconProps {}

const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({
  width = 24,
  height = 24,
  strokeWidth = 1.5,
  color = 'default',
  customColor,
  disabled,
  onPress,
  wrapperStyle,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <IconTouchableViewStyle
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
      style={wrapperStyle}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M18 15.5245L12 9.52454L6 15.5245"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ChevronUpIcon;
