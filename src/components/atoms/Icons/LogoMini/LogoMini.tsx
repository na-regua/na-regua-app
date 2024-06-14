import React from 'react';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface ILogoMiniProps extends IIconProps {}

const LogoMiniIcon: React.FC<ILogoMiniProps> = ({
  width = 64,
  height = 64,
  onPress,
  disabled,
  wrapperStyle,
}) => {
  return (
    <IconTouchableViewStyle
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
      style={{width, height, ...wrapperStyle}}></IconTouchableViewStyle>
  );
};

export default LogoMiniIcon;
