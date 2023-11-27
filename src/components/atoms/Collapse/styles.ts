import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const CollapseStyle = styled.View`
  border: 1px solid ${Colors.border};
  border-radius: 8px;

  padding: 12px;
  gap: 12px;
`;

export const HeaderStyle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
