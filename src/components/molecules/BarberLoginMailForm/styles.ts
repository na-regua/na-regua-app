import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContentStyle = styled.View`
  flex: 1;
  padding-top: 42px;
  width: 300px;
  gap: ${Metrics.paddingX3}px;
`;

export const LogoContainerStyle = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${Metrics.paddingX4}px;
`;

export const AvoidingViewStyle = styled.KeyboardAvoidingView`
  gap: ${Metrics.paddingX3}px;
`;
