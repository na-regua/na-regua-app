import {Button} from '@/components/atoms';
import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const OnQueueActionsStyled = styled.View`
  gap: ${Metrics.unitX3}px;
`;

export const OnQueueButtonStyled = styled(Button)`
  flex: 1;
`;

export const OnQueueActionsRowStyled = styled.View`
  gap: ${Metrics.unitX3}px;
  flex-direction: row;
  align-items: center;
`;
