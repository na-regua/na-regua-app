import {Colors} from '@/theme';
import {StyleSheet, ViewStyle} from 'react-native';
import {TButtonThemes} from './Button';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowColor: Colors.black3,
  },
  main: {
    backgroundColor: Colors.main,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  success: {
    backgroundColor: Colors.success,
  },
  default: {
    backgroundColor: Colors.default,
  },
  disabled: {
    backgroundColor: Colors.disabled,
    shadowOpacity: 0.1,
  },
  warning: {
    backgroundColor: Colors.warning,
  },
  text: {
    color: Colors.white3,
  },
  textDisabled: {
    color: Colors.black1,
  },
});

const buttonThemeStylesObj: Record<TButtonThemes, ViewStyle> = {
  main: styles.main,
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  success: styles.success,
  default: styles.default,
  warning: styles.warning,
};

export {buttonThemeStylesObj, styles};
