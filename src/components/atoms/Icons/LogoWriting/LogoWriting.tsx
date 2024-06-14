import React from 'react';
import {Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface ILogoWritingProps extends IIconProps {}

const LogoWritingIcon: React.FC<ILogoWritingProps> = ({
  width = 260,
  height = 60,
}) => {
  return (
    <IconTouchableViewStyle>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"></Svg>
    </IconTouchableViewStyle>
  );
};

export default LogoWritingIcon;
