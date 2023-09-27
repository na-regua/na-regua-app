import {Colors, Fonts} from '@/theme';
import {TColorsType} from '@/theme/colors';
import React, {PropsWithChildren, useMemo} from 'react';
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

interface ITypographyProps extends PropsWithChildren {
  variant: ITypographyVariants;
  color?: TColorsType;
  customStyles?: TextStyle;
}

const Typography: React.FC<ITypographyProps> = ({
  children,
  variant,
  color,
  customStyles,
}) => {
  const textColor = useMemo(() => color && Colors[color], [color]);

  const stylesByVariant = useMemo(
    () => styles[variant as keyof typeof styles],
    [variant],
  );

  return (
    <Text style={{...stylesByVariant, color: textColor, ...customStyles}}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    width: 'auto',
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.h1,
  },
  h2: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.h2,
  },
  h3: {
    fontWeight: Fonts.weights.bold,
    fontFamily: Fonts.types.bold,
    fontSize: Fonts.sizes.h3,
  },
  h4: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.h4,
  },
  h5: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.h5,
  },
  h6: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.h6,
  },
  body1: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.body1,
  },
  body2: {
    fontWeight: Fonts.weights.regular,
    fontFamily: Fonts.types.regular,
    fontSize: Fonts.sizes.body2,
  },
  button: {
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    fontSize: Fonts.sizes.button,
  },
  caption: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    fontSize: Fonts.sizes.caption,
  },
  tip: {
    fontWeight: Fonts.weights.regular,
    fontFamily: Fonts.types.regular,
    fontSize: Fonts.sizes.tip,
  },
});

export default Typography;
