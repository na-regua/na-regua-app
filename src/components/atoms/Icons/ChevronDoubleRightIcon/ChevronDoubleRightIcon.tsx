import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';
import Animated from 'react-native-reanimated';

interface IChevronDoubleRightIconProps extends IIconProps {
  animatedPathProps?: any;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const ChevronDoubleRightIcon: React.FC<IChevronDoubleRightIconProps> = ({
  width = 20,
  height = 20,
  color = 'default',
  customColor,
  strokeWidth = 1.5,
  disabled = true,
  onPress,
  animatedPathProps = {},
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
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <AnimatedPath
          d="M11 15.2782L16 10.2782L11 5.2782"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedPathProps}
        />
        <AnimatedPath
          d="M4 15.2782L9 10.2782L4 5.2782"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedPathProps}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ChevronDoubleRightIcon;
