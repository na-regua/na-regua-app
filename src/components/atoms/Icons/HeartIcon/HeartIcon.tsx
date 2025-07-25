import {Colors} from '@/theme';
import {TColorsType} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IHeartProps extends IIconProps {
  fill?: TColorsType;
}

const HeartIcon: React.FC<IHeartProps> = ({
  width = 20,
  height = 20,
  strokeWidth = 1.5,
  color = 'default',
  customColor,
  fill,
  onPress,
  disabled,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  const fillColor = useMemo(() => fill && Colors[fill], [fill]);

  return (
    <IconTouchableViewStyle disabled={disabled} onPress={onPress}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M17.3666 3.84172C16.941 3.41589 16.4356 3.0781 15.8794 2.84763C15.3232 2.61716 14.727 2.49854 14.1249 2.49854C13.5229 2.49854 12.9267 2.61716 12.3705 2.84763C11.8143 3.0781 11.3089 3.41589 10.8833 3.84172L9.99994 4.72506L9.1166 3.84172C8.25686 2.98198 7.0908 2.49898 5.87494 2.49898C4.65908 2.49898 3.49301 2.98198 2.63327 3.84172C1.77353 4.70147 1.29053 5.86753 1.29053 7.08339C1.29053 8.29925 1.77353 9.46531 2.63327 10.3251L3.5166 11.2084L9.99994 17.6917L16.4833 11.2084L17.3666 10.3251C17.7924 9.89943 18.1302 9.39407 18.3607 8.83785C18.5912 8.28164 18.7098 7.68546 18.7098 7.08339C18.7098 6.48132 18.5912 5.88514 18.3607 5.32893C18.1302 4.77271 17.7924 4.26735 17.3666 3.84172Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={fillColor}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default HeartIcon;
