import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface FullscreenIconProps extends IIconProps {}

const FullscreenIcon: React.FC<FullscreenIconProps> = ({
  width = 24,
  height = 24,
  strokeWidth = 2,
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
          d="M8 3.27832H5C4.46957 3.27832 3.96086 3.48903 3.58579 3.86411C3.21071 4.23918 3 4.74789 3 5.27832V8.27832M21 8.27832V5.27832C21 4.74789 20.7893 4.23918 20.4142 3.86411C20.0391 3.48903 19.5304 3.27832 19 3.27832H16M16 21.2783H19C19.5304 21.2783 20.0391 21.0676 20.4142 20.6925C20.7893 20.3175 21 19.8088 21 19.2783V16.2783M3 16.2783V19.2783C3 19.8088 3.21071 20.3175 3.58579 20.6925C3.96086 21.0676 4.46957 21.2783 5 21.2783H8"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default FullscreenIcon;
