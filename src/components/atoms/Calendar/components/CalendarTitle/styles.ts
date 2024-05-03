import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const CalendarTitleWrapperStyled = styled.View`
  gap: ${Metrics.unitX2}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const CalendarTitleTouchableStyled = styled.TouchableOpacity<{
  active?: boolean;
}>`
  align-self: flex-start;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
`;
