import {Colors, Fonts} from '@/theme';
import styled from 'styled-components/native';

export const TextAreaStyled = styled.TextInput<{
  isFocused?: boolean;
  isActive?: boolean;
}>`
  border-radius: 12px;
  border: 1px solid ${Colors.border};
  font-family: ${Fonts.types.semiBold};
  font-weight: ${Fonts.weights.semiBold};
  color: ${Colors.black1};
  padding: 12px;
  text-align-vertical: top;

  ${({isFocused}) =>
    isFocused &&
    `
    border-color: ${Colors.main};
  `}

  ${({isActive}) =>
    isActive &&
    `
    border-color: ${Colors.main};
  `}
`;
