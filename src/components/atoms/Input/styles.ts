import {Colors, Fonts} from '@/theme';
import {ColorValue, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  input: {},
  inputFocused: {},
  suffixWrapper: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    height: 'auto',
    width: 'auto',
    marginVertical: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const InputWrapperStyle = styled.View`
  position: relative;
`;

export const InputLabelStyle = styled.Text<{
  focused?: boolean;
}>`
  position: absolute;
  background-color: ${Colors.bgLight};
  z-index: 2;
  top: -6px;
  left: 12px;
  padding: 0 2px;
  color: ${({focused}) => (focused ? Colors.main : Colors.placeholder)};
  font-size: 12px;
  font-family: ${Fonts.types.medium};
  font-weight: ${Fonts.weights.medium};
`;

export const InputStyle = styled.TextInput<{
  active?: boolean;
  focused?: boolean;
  suffixWidth?: number;
  borderColor?: ColorValue | string;
}>`
  min-height: 44px;
  max-height: 44px;
  font-weight: ${Fonts.weights.semiBold};
  font-family: ${Fonts.types.semiBold};
  border-width: 1px;
  border-color: ${({borderColor}) =>
    (borderColor && borderColor?.toString()) || Colors.border};
  border-radius: 8px;
  padding: 4px 12px;
  color: ${Colors.black3};
  font-size: 14px;
  z-index: 1;

  ${({active}) =>
    active &&
    `
   font-family: ${Fonts.types.semiBold};
   font-weight: ${Fonts.weights.semiBold};
  `}

  ${({focused}) =>
    focused &&
    `
    border-color: ${Colors.main};
  `}
`;
