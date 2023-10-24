import styled from 'styled-components/native';

export const CheckboxWrapperStyle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  margin: 2px 0;
`;

export const CheckboxContainerStyle = styled.View`
  padding: 4px;
  width: 19px;
  height: 19px;

  align-items: center;
  justify-content: center;
  border-radius: 4px;

  border: 1px solid ${({theme}) => theme.colors.default};
`;

export const CheckboxDotStyle = styled.View<{active?: boolean}>`
  width: 11px;
  height: 11px;
  border-radius: 1px;
  background-color: ${({active, theme}) =>
    active ? theme.colors.primary : 'transparent'};
`;
