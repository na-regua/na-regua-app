import React, {useMemo} from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Colors} from '@/theme';
import {useTranslation} from 'react-i18next';
import Loader from '../Loader/Loader';
import {TypographyStyles} from '../Typography/Typography';
import {
  ButtonStyle,
  ButtonThemeColor,
  LabelStyle,
  SuffixStyle,
  shadowStyle,
} from './styles';

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
  suffix?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({
  colorScheme = 'main',
  title,
  disabled,
  loading = false,
  variant = 'filled',
  suffix,
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
      activeOpacity={0.6}
      disabled={disabled || loading}
      loading={loading}
      style={buttonShadowStyle}
      hasSuffix={!!suffix}
      {...buttonProps}>
      {!loading ? (
        <>
          <LabelStyle
            disabled={disabled}
            colorScheme={colorScheme}
            variant={variant}
            style={TypographyStyles.button}>
            {title && t(title)}
          </LabelStyle>
          {suffix && <SuffixStyle>{suffix}</SuffixStyle>}
        </>
      ) : (
        <Loader size="64" color={loaderColor} strokeWidth={3} />
      )}
    </ButtonStyle>
  );
};

export default Button;
