import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface IMaquinaIconProps extends IIconProps {}

const MaquinaIcon: React.FC<IMaquinaIconProps> = ({
  width = 22,
  height = 24,
  color = 'default',
  strokeWidth = 1.5,
  customColor,
}) => {
  const getColor = useMemo(
    () => Colors[color] || customColor,
    [color, customColor],
  );

  return (
    <View style={styles.iconWrapper}>
      <Svg width={width} height={height} viewBox="0 0 22 24" fill="none">
        <Path
          d="M1.42285 20.0769V8.84613C1.42285 7.18928 2.766 5.84613 4.42285 5.84613H18.1152C19.772 5.84613 21.1152 7.18927 21.1152 8.84613V20.0769C21.1152 21.7338 19.772 23.0769 18.1152 23.0769H4.42285C2.766 23.0769 1.42285 21.7338 1.42285 20.0769Z"
          stroke={getColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M17.6697 18.6461C17.6697 19.4618 17.0084 20.1231 16.1927 20.1231C15.3771 20.1231 14.7158 19.4618 14.7158 18.6461C14.7158 17.8305 15.3771 17.1692 16.1927 17.1692C17.0084 17.1692 17.6697 17.8305 17.6697 18.6461ZM15.4543 18.6461C15.4543 19.054 15.7849 19.3846 16.1927 19.3846C16.6006 19.3846 16.9312 19.054 16.9312 18.6461C16.9312 18.2383 16.6006 17.9077 16.1927 17.9077C15.7849 17.9077 15.4543 18.2383 15.4543 18.6461Z"
          fill={getColor}
        />
        <Path
          d="M7.82299 18.6461C7.82299 19.4618 7.16175 20.1231 6.34606 20.1231C5.53038 20.1231 4.86914 19.4618 4.86914 18.6461C4.86914 17.8305 5.53038 17.1692 6.34606 17.1692C7.16175 17.1692 7.82299 17.8305 7.82299 18.6461ZM5.6076 18.6461C5.6076 19.054 5.93822 19.3846 6.34606 19.3846C6.7539 19.3846 7.08453 19.054 7.08453 18.6461C7.08453 18.2383 6.7539 17.9077 6.34606 17.9077C5.93822 17.9077 5.6076 18.2383 5.6076 18.6461Z"
          fill={getColor}
        />
        <Path
          d="M1.42285 7.8154V0.923096H1.88439C2.98896 0.923096 3.88439 1.81853 3.88439 2.9231V5.84617M21.1152 7.8154V0.923096H20.6536C19.5491 0.923096 18.6536 1.81853 18.6536 2.9231V5.84617"
          stroke={getColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M3.88477 5.84617L4.88278 2.51947C5.02531 2.04437 5.69807 2.04437 5.8406 2.51947L6.3597 4.2498C6.50223 4.7249 7.17499 4.7249 7.31753 4.2498L7.83662 2.51947C7.97915 2.04437 8.65192 2.04437 8.79445 2.51947L9.31355 4.2498C9.45608 4.7249 10.1288 4.7249 10.2714 4.2498L10.7905 2.51947C10.933 2.04437 11.6058 2.04437 11.7483 2.51947L12.2674 4.2498C12.4099 4.7249 13.0827 4.7249 13.2252 4.2498L13.7443 2.51947C13.8868 2.04437 14.5596 2.04437 14.7021 2.51947L15.2212 4.2498C15.3638 4.7249 16.0365 4.7249 16.1791 4.2498L16.6982 2.51947C16.8407 2.04437 17.5135 2.04437 17.656 2.51947L18.654 5.84617"
          stroke={getColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
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

export default MaquinaIcon;
