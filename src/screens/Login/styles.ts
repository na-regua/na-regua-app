import {Button} from '@/components/atoms';
import {Colors, Metrics} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.bgContrast};
  padding: ${Metrics.unitX8}px;
`;

export const WelcomeContent = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${Metrics.unitX8}px;
  min-width: 240px;
  max-width: 360px;
  padding: ${Metrics.unitX4}px;
  width: 100%;
`;

export const WelcomeTitle = styled.View`
  align-self: stretch;
  gap: ${Metrics.unitX2}px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const SwitchButton = styled.View`
  border-radius: 12px;
  padding: 4px;
  background: ${Colors.primary}${hexPercentage['20']};
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const SwitchButtonStyle = styled(Button)`
  flex: 1;
`;

export const ContinueButtonStyle = styled(Button)`
  width: 100%;
`;
