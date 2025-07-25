import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface RefreshIconProps extends IIconProps {}

const RefreshIcon: React.FC<RefreshIconProps> = ({
  width = 20,
  height = 20,
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
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M19.1667 3.33325V8.33325H14.1667"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0.833252 16.6667V11.6667H5.83325"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.92492 7.49998C3.34756 6.30564 4.06586 5.23782 5.01281 4.39616C5.95975 3.55451 7.10447 2.96645 8.34016 2.68686C9.57584 2.40727 10.8622 2.44527 12.0792 2.79729C13.2963 3.14932 14.4043 3.80391 15.2999 4.69998L19.1666 8.33331M0.833252 11.6666L4.69992 15.3C5.59554 16.1961 6.70356 16.8506 7.92059 17.2027C9.13762 17.5547 10.424 17.5927 11.6597 17.3131C12.8954 17.0335 14.0401 16.4455 14.987 15.6038C15.934 14.7621 16.6523 13.6943 17.0749 12.5"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default RefreshIcon;
