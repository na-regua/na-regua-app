import React, {useMemo} from 'react';
import {StyleProp, TouchableOpacityProps, ViewStyle} from 'react-native';

import {Colors, TColorsType} from '@/theme';
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
export type TButtonSizes = 'small' | 'medium' | 'large';

export interface IButtonProps extends TouchableOpacityProps {
  colorScheme?: TButtonColorScheme;
  textColor?: TColorsType;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: TButtonVariants;
  suffix?: React.ReactNode;
  translate?: boolean;
  customContent?: React.ReactNode;
  fillSpace?: boolean;
  size?: TButtonSizes;
}

const Button: React.FC<IButtonProps> = ({
  colorScheme = 'main',
  title,
  disabled,
  loading = false,
  variant = 'filled',
  suffix,
  translate = true,
  customContent = false,
  fillSpace,
  size = 'medium',
  textColor,
  ...buttonProps
}) => {
  const {t} = useTranslation();

  const buttonShadowStyle: StyleProp<ViewStyle> = useMemo(
    () => variant === 'filled' && shadowStyle,
    [variant],
  );

  const customStyles: StyleProp<ViewStyle> = useMemo(
    () => ({
      ...(fillSpace ? {flex: 1} : {}),
    }),
    [fillSpace],
  );

  const loaderColor: string = useMemo(() => {
    if (textColor) {
      return Colors[textColor];
    }

    if (colorScheme === 'white' && variant === 'filled') {
      return Colors.main;
    }

    return variant === 'filled' ? Colors.white3 : ButtonThemeColor[colorScheme];
  }, [variant, colorScheme, textColor]);

  const buttonText: string = useMemo(
    () => (title ? (translate ? t(title) : title) : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, translate],
  );

  const textColorStyle = useMemo(
    () => (textColor ? {color: Colors[textColor]} : {}),
    [textColor],
  );

  return (
    <ButtonStyle
      variant={variant}
      colorScheme={colorScheme}
      activeOpacity={0.6}
      disabled={disabled || loading}
      loading={loading}
      style={[buttonShadowStyle, customStyles]}
      hasSuffix={!!suffix}
      size={size}
      {...buttonProps}>
      {!loading && !!customContent && customContent}
      {!loading && !customContent && (
        <>
          <LabelStyle
            disabled={disabled}
            colorScheme={colorScheme}
            variant={variant}
            style={[TypographyStyles.button, textColorStyle]}>
            {buttonText}
          </LabelStyle>

          {!!suffix && <SuffixStyle>{suffix}</SuffixStyle>}
        </>
      )}
      {loading && <Loader size="64" color={loaderColor} strokeWidth={2.5} />}
    </ButtonStyle>
  );
};

export default Button;
