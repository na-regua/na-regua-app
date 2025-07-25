import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const SplashContainerStyle = styled.View`
  flex: 1;
  width: ${Metrics.screenWidth}px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${Colors.bgContrast};
  position: relative;
`;

export const SpashContentStyle = styled.View`
  flex: 1;
  width: ${Metrics.screenWidth}px;
  padding: ${Metrics.smPadding}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Metrics.unitX3}px;
`;
