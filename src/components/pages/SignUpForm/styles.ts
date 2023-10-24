import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  gap: 18px;
  justify-content: space-between;
`;

export const ScrollWrapperStyle = styled.ScrollView`
  flex: 1;
`;

export const ScrollContent = styled.KeyboardAvoidingView`
  flex: 1;
  gap: 18px;
  width: ${Metrics.smWidth}px;
`;
