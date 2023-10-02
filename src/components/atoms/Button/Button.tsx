import React, {useMemo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Typography from '../Typography/Typography';

import {styles, buttonThemeStylesObj} from './styles';

export type TButtonThemes =
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
      activeOpacity={0.8}
      disabled={disabled}
      {...buttonProps}>
      <Typography
        customStyles={disabled ? styles.textDisabled : styles.text}
        variant="button">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;
