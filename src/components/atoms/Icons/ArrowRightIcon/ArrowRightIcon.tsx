import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IArrowRightIconProps extends IIconProps {}

const ArrowRightIcon: React.FC<IArrowRightIconProps> = ({
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
          d="M7.99996 2.66669L7.05996 3.60669L10.78 7.33335H2.66663V8.66669H10.78L7.05996 12.3934L7.99996 13.3334L13.3333 8.00002L7.99996 2.66669Z"
          fill={getColor}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ArrowRightIcon;
