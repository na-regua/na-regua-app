import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  width: ${Metrics.screenWidth}px;
  background-color: ${Colors.bgLight};
`;

export const ContentStyle = styled.View`
  flex: 1;
  width: ${Metrics.screenWidth}px;
  flex-direction: column;
  gap: 18px;
  justify-content: flex-end;
  padding: ${Metrics.smPadding}px;
`;

export const ActionsStyle = styled.View`
  flex-direction: column;
  gap: ${Metrics.smPadding}px;
`;
