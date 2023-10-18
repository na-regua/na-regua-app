import {Colors, Fonts} from '@/theme';
import styled from 'styled-components/native';

export const CodeWrapperStyle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12;
`;

export const CodeInputStyle = styled.TextInput<{isFocused?: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${Colors.border};
  border-style: solid;
  text-align: center;
  color: ${Colors.black3};
  font-size: 14;
  font-weight: ${Fonts.weights.semiBold};
  font-family: ${Fonts.types.semiBold};

  ${({isFocused}) =>
    isFocused &&
    `
    color: ${Colors.primary};
    border-color: ${Colors.primary};
  `}
`;
