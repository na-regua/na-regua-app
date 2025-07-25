import {Colors, Fonts} from '@/theme';
import styled from 'styled-components/native';

export const CodeWrapperStyle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const CodeInputStyle = styled.TextInput<{isFocused?: boolean}>`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Colors.primary};
  border-style: solid;
  text-align: center;
  color: ${Colors.black3};
  font-size: 14px;
  font-weight: ${Fonts.weights.semiBold};
  font-family: ${Fonts.types.semiBold};

  ${({isFocused}) =>
    isFocused &&
    `
    color: ${Colors.primary};
    border-color: ${Colors.primary};
  `}
`;
