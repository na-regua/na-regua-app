import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const CalendarActionsWrapperStyled = styled.View`
  gap: ${Metrics.unitX1}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CalendarActionTouchableStyled = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
