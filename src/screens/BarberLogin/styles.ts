import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  background: ${Colors.bgContrast};
  align-items: center;
  justify-content: flex-start;
  gap: ${Metrics.paddingX4}px;
`;

export const FooterContainerStyle = styled.View`
  width: 300px;
  gap: ${Metrics.paddingX4}px;
  justify-content: center;
  align-items: center;
`;
