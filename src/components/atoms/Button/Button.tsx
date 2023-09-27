import {Colors} from '@/theme';
import React, {useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Typography from '../Typography/Typography';

type TButtonThemes =
  | 'main'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'default'
  | 'warning';

interface IButtonProps extends TouchableOpacityProps {
  theme?: TButtonThemes;
  title?: string;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  theme = 'main',
  title,
  disabled,
  ...buttonProps
}) => {
  const buttonThemeStyles = useMemo(() => {
    if (disabled) {
      return [styles.button, styles.disabled];
    }
    return [styles.button, buttonThemeStylesObj[theme]];
  }, [theme, disabled]);

  return (
    <TouchableOpacity
      style={buttonThemeStyles}
      {...buttonProps}
      activeOpacity={0.8}>
      <Typography
        customStyles={disabled ? styles.disabled : styles.text}
        variant="button">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 40,
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
  },
  warning: {
    backgroundColor: Colors.warning,
  },
  text: {
    color: Colors.white3,
  },
  textDisabled: {
    color: Colors.black3,
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

export default Button;
