import {Colors, Fonts, Metrics} from '@/theme';
import {TColorsType} from '@/theme/colors';
import {FontsType} from '@/theme/fonts';
import React, {PropsWithChildren, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TextStyle} from 'react-native';

type ITypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'tip';

export interface ITypographyProps extends PropsWithChildren {
  variant?: ITypographyVariants;
  color?: TColorsType;
  style?: TextStyle;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  fonts?: FontsType;
  weight?: keyof typeof Fonts.weights;
  translate?: boolean;
  translateProps?: Record<string, any>;
}

const Typography: React.FC<ITypographyProps> = ({
  children,
  variant = 'body1',
  color = 'black3',
  style,
  textAlign,
  weight,
  translate = true,
  translateProps,
}) => {
  const {t} = useTranslation();

  const textColor = useMemo(() => color && Colors[color], [color]);

  const stylesByVariant = useMemo(
    () => TypographyStyles[variant as keyof typeof TypographyStyles],
    [variant],
  );

  return (
    <Text
      style={[
        stylesByVariant,
        {
          textAlign,
          color: textColor,
          ...(weight ? {fontWeight: Fonts.weights[weight]} : {}),
        },
        style,
      ]}>
      {typeof children === 'string' && translate
        ? t(children, translateProps)
        : children}
    </Text>
  );
};

export const TypographyStyles = StyleSheet.create({
  h1: {
    width: 'auto',
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.h1,
    lineHeight: Fonts.sizes.h1 * Metrics.lineHeight,
  },
  h2: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.h2,
    lineHeight: Fonts.sizes.h2 * Metrics.lineHeight,
  },
  h3: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.h3,
    lineHeight: Fonts.sizes.h3 * Metrics.lineHeight,
  },
  h4: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.h4,
    lineHeight: Fonts.sizes.h4 * Metrics.lineHeight,
  },
  h5: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.h5,
    lineHeight: Fonts.sizes.h5 * Metrics.lineHeight,
  },
  h6: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.h6,
    lineHeight: Fonts.sizes.h6 * Metrics.lineHeight,
  },
  body1: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.body1,
    lineHeight: Fonts.sizes.body1 * Metrics.lineHeight,
  },
  body2: {
    fontWeight: Fonts.weights.regular,
    fontFamily: Fonts.types.regular,
    fontSize: Fonts.sizes.body2,
    lineHeight: Fonts.sizes.body2 * Metrics.lineHeight,
  },
  button: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.button,
    lineHeight: Fonts.sizes.button * Metrics.lineHeight,
  },
  caption: {
    fontWeight: Fonts.weights.regular,
    fontFamily: Fonts.types.regular,
    fontSize: Fonts.sizes.caption,
    lineHeight: Fonts.sizes.caption * Metrics.lineHeight,
  },
  tip: {
    fontWeight: Fonts.weights.regular,
    fontFamily: Fonts.types.regular,
    fontSize: Fonts.sizes.tip,
    lineHeight: Fonts.sizes.tip * Metrics.lineHeight,
  },
});

export default Typography;
