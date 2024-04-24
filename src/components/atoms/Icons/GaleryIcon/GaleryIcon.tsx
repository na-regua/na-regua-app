import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IGaleryIconProps extends IIconProps {}

const GaleryIcon: React.FC<IGaleryIconProps> = ({
  width = 24,
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
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21.3333 2.66667V21.3333H2.66667V2.66667H21.3333ZM21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0ZM14.8533 11.8133L10.8533 16.9733L8 13.52L4 18.6667H20L14.8533 11.8133Z"
          fill={getColor}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default GaleryIcon;
