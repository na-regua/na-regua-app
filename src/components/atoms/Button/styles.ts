import {Colors} from '@/theme';
import {ViewStyle} from 'react-native';
import styled, {css} from 'styled-components/native';
import {RuleSet} from 'styled-components/native/dist/types';
import {TButtonColorScheme, TButtonVariants} from './Button';

export const shadowStyle: ViewStyle = {
  shadowColor: Colors.black1,
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.2,
};

const FilledButton = css``;

const OutlinedButton = css`
  border-width: 1px;
  background-color: transparent;
`;

const VariantsButton: Record<TButtonVariants, RuleSet> = {
  filled: FilledButton,
  outlined: OutlinedButton,
};

export const ButtonThemeColor: Record<TButtonColorScheme, string> = {
  main: Colors.main,
  primary: Colors.primary,
  secondary: Colors.secondary,
  danger: Colors.danger,
  success: Colors.success,
  default: Colors.default,
  warning: Colors.warning,
  white: Colors.white3,
};

export const ButtonStyle = styled.TouchableOpacity<{
  variant: TButtonVariants;
  colorScheme: TButtonColorScheme;
  disabled?: boolean;
  loading?: boolean;
}>`
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 8px;

  ${({colorScheme}) => `
    background-color: ${ButtonThemeColor[colorScheme]};
    border-color: ${ButtonThemeColor[colorScheme]};
  `}

  ${({variant}) => VariantsButton[variant]}

  ${({disabled, loading}) =>
    disabled &&
    !loading &&
    `
    background-color: ${Colors.disabled};
    border-color: ${Colors.disabled};
  `}

  ${({loading}) =>
    loading &&
    `
    opacity: 0.9;
  `}
`;

export const LabelStyle = styled.Text<{
  variant: TButtonVariants;
  colorScheme: TButtonColorScheme;
  disabled?: boolean;
}>`
  ${({variant, colorScheme}) =>
    `color: ${
      variant === 'filled' ? Colors.white3 : ButtonThemeColor[colorScheme]
    };`}
  ${({variant, colorScheme}) =>
    colorScheme === 'white' && variant === 'filled' && `color: ${Colors.main}`}
  ${({disabled}) => disabled && `color: ${Colors.black1};`}
`;
