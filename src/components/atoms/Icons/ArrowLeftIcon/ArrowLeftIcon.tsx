import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IArrowLeftIconProps extends IIconProps {}

const ArrowLeftIcon: React.FC<IArrowLeftIconProps> = ({
  width = 16,
  height = 16,
  color = 'default',
  customColor,
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
      activeOpacity={0.6}
      disabled={disabled}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path
          d="M8.00004 13.3333L8.94004 12.3933L5.22004 8.66665H13.3334V7.33331L5.22004 7.33331L8.94004 3.60665L8.00004 2.66665L2.66671 7.99998L8.00004 13.3333Z"
          fill={getColor}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ArrowLeftIcon;
