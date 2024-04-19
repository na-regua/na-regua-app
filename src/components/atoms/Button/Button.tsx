import React, {useMemo} from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Colors} from '@/theme';
import Loader from '../Loader/Loader';
import {TypographyStyles} from '../Typography/Typography';
import {ButtonStyle, ButtonThemeColor, LabelStyle, shadowStyle} from './styles';
import {useTranslation} from 'react-i18next';

export type TButtonColorScheme =
  | 'main'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'default'
  | 'white'
  | 'warning';

export type TButtonVariants = 'filled' | 'outlined' | 'ghost' | 'text';

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
  const {t} = useTranslation();

  const buttonShadowStyle = useMemo(
    () => variant === 'filled' && shadowStyle,
    [variant],
  );

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
      style={buttonShadowStyle}
      {...buttonProps}>
      {!loading ? (
        <LabelStyle
          disabled={disabled}
          colorScheme={colorScheme}
          variant={variant}
          style={TypographyStyles.button}>
          {title && t(title)}
        </LabelStyle>
      ) : (
        <Loader color={loaderColor} />
      )}
    </ButtonStyle>
  );
};

export default Button;
