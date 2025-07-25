const types = {
  light: 'NoirPro-Light',
  regular: 'NoirPro-Regular',
  medium: 'NoirPro-Medium',
  semiBold: 'NoirPro-SemiBold',
  bold: 'NoirPro-Bold',
};

const weights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

const sizes = {
  h1: 32,
  h2: 29,
  h3: 26,
  h4: 23,
  h5: 20,
  h6: 20,
  body1: 16,
  body2: 16,
  caption: 14,
  button: 14,
  tip: 12,
};

export type FontsType = {
  types: Record<keyof typeof types, string>;
  weights: Record<keyof typeof weights, any>;
  sizes: Record<keyof typeof sizes, number>;
};

export default {
  types,
  weights,
  sizes,
} as FontsType;
