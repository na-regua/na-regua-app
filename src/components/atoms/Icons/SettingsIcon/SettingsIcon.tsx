import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ClipPath, Defs, Path, Rect, Svg} from 'react-native-svg';
import {IIconProps} from '../Icons';

interface ISettingsIconProps extends IIconProps {}

const SettingsIcon: React.FC<ISettingsIconProps> = ({
  width = 21,
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
      <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
        <Path
          d="M10.125 12.5C11.5057 12.5 12.625 11.3807 12.625 10C12.625 8.61929 11.5057 7.5 10.125 7.5C8.74429 7.5 7.625 8.61929 7.625 10C7.625 11.3807 8.74429 12.5 10.125 12.5Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.2913 12.4999C16.1804 12.7513 16.1473 13.0301 16.1963 13.3004C16.2454 13.5707 16.3742 13.8202 16.5663 14.0166L16.6163 14.0666C16.7713 14.2214 16.8942 14.4052 16.9781 14.6075C17.062 14.8098 17.1052 15.0267 17.1052 15.2458C17.1052 15.4648 17.062 15.6817 16.9781 15.884C16.8942 16.0863 16.7713 16.2701 16.6163 16.4249C16.4616 16.5799 16.2777 16.7028 16.0754 16.7867C15.8731 16.8706 15.6562 16.9137 15.4372 16.9137C15.2181 16.9137 15.0013 16.8706 14.7989 16.7867C14.5966 16.7028 14.4128 16.5799 14.258 16.4249L14.208 16.3749C14.0116 16.1828 13.7622 16.0539 13.4918 16.0049C13.2215 15.9559 12.9427 15.989 12.6913 16.0999C12.4449 16.2056 12.2347 16.381 12.0866 16.6045C11.9385 16.8281 11.8591 17.0901 11.858 17.3583V17.4999C11.858 17.9419 11.6824 18.3659 11.3699 18.6784C11.0573 18.991 10.6334 19.1666 10.1913 19.1666C9.74931 19.1666 9.32539 18.991 9.01283 18.6784C8.70027 18.3659 8.52467 17.9419 8.52467 17.4999V17.4249C8.51822 17.1491 8.42894 16.8816 8.26843 16.6572C8.10793 16.4328 7.88362 16.2618 7.62467 16.1666C7.37333 16.0557 7.09451 16.0226 6.82418 16.0716C6.55386 16.1206 6.30441 16.2495 6.10801 16.4416L6.05801 16.4916C5.90322 16.6465 5.71941 16.7695 5.51708 16.8534C5.31474 16.9372 5.09787 16.9804 4.87884 16.9804C4.65982 16.9804 4.44294 16.9372 4.24061 16.8534C4.03828 16.7695 3.85446 16.6465 3.69967 16.4916C3.54471 16.3368 3.42178 16.153 3.33791 15.9507C3.25403 15.7483 3.21086 15.5314 3.21086 15.3124C3.21086 15.0934 3.25403 14.8765 3.33791 14.6742C3.42178 14.4719 3.54471 14.288 3.69967 14.1333L3.74967 14.0833C3.94179 13.8869 4.07066 13.6374 4.11968 13.3671C4.16869 13.0967 4.1356 12.8179 4.02467 12.5666C3.91904 12.3201 3.74364 12.1099 3.52006 11.9618C3.29649 11.8138 3.0345 11.7343 2.76634 11.7333H2.62467C2.18265 11.7333 1.75872 11.5577 1.44616 11.2451C1.1336 10.9325 0.958008 10.5086 0.958008 10.0666C0.958008 9.62456 1.1336 9.20064 1.44616 8.88807C1.75872 8.57551 2.18265 8.39992 2.62467 8.39992H2.69967C2.9755 8.39347 3.24301 8.30418 3.46742 8.14368C3.69184 7.98317 3.86277 7.75886 3.95801 7.49992C4.06894 7.24857 4.10203 6.96976 4.05301 6.69943C4.004 6.4291 3.87512 6.17965 3.68301 5.98325L3.63301 5.93325C3.47805 5.77846 3.35512 5.59465 3.27124 5.39232C3.18737 5.18999 3.1442 4.97311 3.1442 4.75409C3.1442 4.53506 3.18737 4.31818 3.27124 4.11585C3.35512 3.91352 3.47805 3.72971 3.63301 3.57492C3.7878 3.41996 3.97161 3.29703 4.17394 3.21315C4.37627 3.12928 4.59315 3.08611 4.81217 3.08611C5.0312 3.08611 5.24808 3.12928 5.45041 3.21315C5.65274 3.29703 5.83655 3.41996 5.99134 3.57492L6.04134 3.62492C6.23774 3.81703 6.48719 3.94591 6.75752 3.99492C7.02785 4.04394 7.30666 4.01085 7.55801 3.89992H7.62467C7.87115 3.79428 8.08136 3.61888 8.22942 3.39531C8.37748 3.17173 8.45694 2.90974 8.45801 2.64159V2.49992C8.45801 2.05789 8.6336 1.63397 8.94616 1.32141C9.25872 1.00885 9.68265 0.833252 10.1247 0.833252C10.5667 0.833252 10.9906 1.00885 11.3032 1.32141C11.6157 1.63397 11.7913 2.05789 11.7913 2.49992V2.57492C11.7924 2.84307 11.8719 3.10506 12.0199 3.32864C12.168 3.55222 12.3782 3.72762 12.6247 3.83325C12.876 3.94418 13.1548 3.97727 13.4252 3.92826C13.6955 3.87924 13.9449 3.75037 14.1413 3.55825L14.1913 3.50825C14.3461 3.35329 14.5299 3.23036 14.7323 3.14649C14.9346 3.06261 15.1515 3.01944 15.3705 3.01944C15.5895 3.01944 15.8064 3.06261 16.0087 3.14649C16.2111 3.23036 16.3949 3.35329 16.5497 3.50825C16.7046 3.66304 16.8276 3.84685 16.9114 4.04918C16.9953 4.25152 17.0385 4.46839 17.0385 4.68742C17.0385 4.90644 16.9953 5.12332 16.9114 5.32565C16.8276 5.52798 16.7046 5.7118 16.5497 5.86659L16.4997 5.91659C16.3076 6.11298 16.1787 6.36243 16.1297 6.63276C16.0807 6.90309 16.1137 7.18191 16.2247 7.43325V7.49992C16.3303 7.74639 16.5057 7.9566 16.7293 8.10466C16.9529 8.25273 17.2149 8.33218 17.483 8.33325H17.6247C18.0667 8.33325 18.4906 8.50885 18.8032 8.82141C19.1157 9.13397 19.2913 9.55789 19.2913 9.99992C19.2913 10.4419 19.1157 10.8659 18.8032 11.1784C18.4906 11.491 18.0667 11.6666 17.6247 11.6666H17.5497C17.2815 11.6677 17.0195 11.7471 16.796 11.8952C16.5724 12.0432 16.397 12.2534 16.2913 12.4999Z"
          stroke={getColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Defs>
          <ClipPath id="clip0_148_7809">
            <Rect
              width={width}
              height={height}
              fill={getColor}
              transform="translate(0.125)"
            />
          </ClipPath>
        </Defs>
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

export default SettingsIcon;
