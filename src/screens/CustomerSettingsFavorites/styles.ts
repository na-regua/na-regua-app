import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ScrollContentStyle = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
  },
})`
  flex: 1;
`;
