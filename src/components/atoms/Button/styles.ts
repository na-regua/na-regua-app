import {Colors} from '@/theme';
import styled, {css} from 'styled-components/native';
import {RuleSet} from 'styled-components/native/dist/types';
import {TButtonColorScheme, TButtonVariants} from './Button';

const FilledButton = css`
  box-shadow: 0 2px 2px ${Colors.black3}55;
`;

const OutlinedButton = css`
  border-width: 1px;
  background-color: transparent;
  box-shadow: none;
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
    box-shadow: none;
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
  ${({disabled}) => disabled && `color: ${Colors.black3};`}
`;
