import React, {useMemo} from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Colors} from '@/theme';
import Loader from '../Loader/Loader';
import {TypographyStyles} from '../Typography/Typography';
import {ButtonStyle, ButtonThemeColor, LabelStyle} from './styles';

export type TButtonColorScheme =
  | 'main'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'default'
  | 'white'
  | 'warning';

export type TButtonVariants = 'filled' | 'outlined';

export interface IButtonProps extends TouchableOpacityProps {
  colorScheme?: TButtonColorScheme;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: TButtonVariants;
}

const Button: React.FC<IButtonProps> = ({
  colorScheme = 'main',
  title,
  disabled,
  loading = false,
  variant = 'filled',
  ...buttonProps
}) => {
  const loaderColor = useMemo(() => {
    if (colorScheme === 'white' && variant === 'filled') {
      return Colors.main;
    }

    return variant === 'filled' ? Colors.white3 : ButtonThemeColor[colorScheme];
  }, [variant, colorScheme]);

  return (
    <ButtonStyle
      variant={variant}
      colorScheme={colorScheme}
      activeOpacity={0.8}
      disabled={disabled}
      loading={loading}
      {...buttonProps}>
      {!loading ? (
        <LabelStyle
          disabled={disabled}
          colorScheme={colorScheme}
          variant={variant}
          style={TypographyStyles.button}>
          {title}
        </LabelStyle>
      ) : (
        <Loader color={loaderColor} />
      )}
    </ButtonStyle>
  );
};

export default Button;
