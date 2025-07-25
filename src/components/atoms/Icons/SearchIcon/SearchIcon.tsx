import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface SearchIconProps extends IIconProps {}

const SearchIcon: React.FC<SearchIconProps> = ({
  width = 18,
  height = 18,
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
      <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
        <Path
          d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.75 15.75L12.4875 12.4875"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default SearchIcon;
