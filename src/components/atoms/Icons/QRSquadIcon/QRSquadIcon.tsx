import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IQRSquadIconProps extends IIconProps {}

const QRSquadIcon: React.FC<IQRSquadIconProps> = ({
  width = 343,
  height = 376,
  strokeWidth = 4,
  color = 'white3',
  customColor,
  wrapperStyle,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <IconTouchableViewStyle style={wrapperStyle} disabled>
      <Svg width={width} height={height} viewBox="0 0 343 376" fill="none">
        <Path
          d="M2 240.425V122.649V6C2 3.79086 3.79086 2 6 2H146.742M191.361 2H337C339.209 2 341 3.79086 341 6V370C341 372.209 339.209 374 337 374H244.687M192.994 374H157.624M110.284 374H42.8106M24.5 374H6C3.79086 374 2 372.209 2 370V265.69"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default QRSquadIcon;
