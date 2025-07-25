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

export const PermissionItemStyle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Metrics.unitX2}px;
  border-radius: ${Metrics.unitX2}px;
  border: 1px solid ${Colors.border};
  align-self: stretch;
`;
