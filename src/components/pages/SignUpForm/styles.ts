import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  flex-grow: 1;
  gap: 18px;
  justify-content: space-between;
  padding: 18px;
`;

export const ScrollWrapperStyle = styled.ScrollView`
  flex: 1;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 18,
  },
})`
  flex-grow: 1;
  gap: 18px;
  width: ${Metrics.smWidth}px;
`;

export const ContentHeaderStyle = styled.View`
  gap: 4px;
`;
