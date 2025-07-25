import styled from 'styled-components/native';

export const CalendarContainerStyled = styled.View`
  gap: 18px;
`;

export const CalendarHeaderStyled = styled.View<{showActions?: boolean}>`
  gap: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({showActions}) =>
    showActions ? 'space-between' : 'flex-start'};
`;
