import {Colors} from '@/theme';
import {ViewStyle} from 'react-native';
import styled, {css} from 'styled-components/native';
import {RuleSet} from 'styled-components/native/dist/types';
import {TButtonColorScheme, TButtonVariants} from './Button';
import {hexPercentage} from '@/theme/colors';

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

export const shadowStyle: ViewStyle = {
  // IOS
  shadowColor: Colors.black1,
  shadowOffset: {
    height: 2,
    width: 12,
  },
  shadowOpacity: 0.2,
  shadowRadius: 15,
  // Android
  elevation: 6,
};

const FilledButtonStyle = css``;

const OutlinedButtonStyle = css<{colorScheme: TButtonColorScheme}>`
  border-width: 1px;
  ${({colorScheme}) => `
    background-color: ${ButtonThemeColor[colorScheme]}${hexPercentage['20']};
  `}
`;

const GhostButtonStyle = css<{colorScheme: TButtonColorScheme}>`
  ${({colorScheme}) => `
    background-color: ${ButtonThemeColor[colorScheme]}${hexPercentage['20']};
    color: ${ButtonThemeColor[colorScheme]};
  `}
`;

const TextButtonStyle = css`
  background-color: transparent;
  padding: 4px;
`;

const VariantsButton: Record<TButtonVariants, RuleSet<any>> = {
  filled: FilledButtonStyle,
  outlined: OutlinedButtonStyle,
  ghost: GhostButtonStyle,
  text: TextButtonStyle,
};

export const ButtonStyle = styled.TouchableOpacity<{
  variant: TButtonVariants;
  colorScheme: TButtonColorScheme;
  disabled?: boolean;
  loading?: boolean;
  hasSuffix?: boolean;
}>`
  height: 42px;
  padding: 12px 10px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;

  ${({colorScheme}) => `
    background-color: ${ButtonThemeColor[colorScheme]};
    border-color: ${ButtonThemeColor[colorScheme]};
  `}

  ${({variant}) => VariantsButton[variant]}

  ${({disabled, variant, loading}) =>
    disabled &&
    !loading &&
    variant !== 'text' &&
    `background-color: ${Colors.disabled};
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
  ${({colorScheme}) => colorScheme === 'default' && `color: ${Colors.black2};`}
  ${({variant, colorScheme}) =>
    colorScheme === 'white' && variant === 'filled' && `color: ${Colors.main}`}
  ${({disabled}) => disabled && `color: ${Colors.black2};`}
  ${({disabled, variant}) =>
    disabled && variant === 'text' && `color: ${Colors.disabled};`}
`;

export const SuffixStyle = styled.View`
  position: absolute;
  right: 18px;
`;
