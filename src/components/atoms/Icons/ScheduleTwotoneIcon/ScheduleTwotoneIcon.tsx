import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';
import {IconTouchableViewStyle} from '../styles';

interface IScheduleIconProps extends IIconProps {}

const ScheduleTwotoneIcon: React.FC<IScheduleIconProps> = ({
  width = 25,
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
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${25} ${24}`}
        fill="none">
        <Path
          d="M19.9583 3.74996H19.0416V1.91663H17.2083V3.74996H8.04159V1.91663H6.20825V3.74996H5.29159C4.28325 3.74996 3.45825 4.57496 3.45825 5.58329V20.25C3.45825 21.2583 4.28325 22.0833 5.29159 22.0833H19.9583C20.9666 22.0833 21.7916 21.2583 21.7916 20.25V5.58329C21.7916 4.57496 20.9666 3.74996 19.9583 3.74996ZM19.9583 5.58329V8.33329H5.29159V5.58329H19.9583ZM5.29159 20.25V10.1666H19.9583V20.25H5.29159Z"
          fill={getColor}
        />
        <Path
          opacity="0.3"
          d="M5.29175 5.59253H19.9584V8.33336H5.29175V5.59253Z"
          fill={getColor}
        />
      </Svg>
    </IconTouchableViewStyle>
  );
};

export default ScheduleTwotoneIcon;
