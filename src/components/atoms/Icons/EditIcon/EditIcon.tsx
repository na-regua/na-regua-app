import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IEditIconProps extends IIconProps {}

const EditIcon: React.FC<IEditIconProps> = ({
  width = 20,
  height = 20,
  strokeWidth = 1.5,
  color = 'default',
  customColor,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <View style={styles.iconWrapper}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M14.167 2.49999C14.3859 2.28112 14.6457 2.1075 14.9317 1.98905C15.2176 1.8706 15.5241 1.80963 15.8337 1.80963C16.1432 1.80963 16.4497 1.8706 16.7357 1.98905C17.0216 2.1075 17.2815 2.28112 17.5003 2.49999C17.7192 2.71886 17.8928 2.97869 18.0113 3.26466C18.1297 3.55063 18.1907 3.85713 18.1907 4.16665C18.1907 4.47618 18.1297 4.78268 18.0113 5.06865C17.8928 5.35461 17.7192 5.61445 17.5003 5.83332L6.25033 17.0833L1.66699 18.3333L2.91699 13.75L14.167 2.49999Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditIcon;