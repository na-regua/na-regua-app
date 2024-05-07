import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const NotificationItemStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{read?: boolean}>`
  padding: ${Metrics.unitX2}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.border};
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${Metrics.unitX2}px;
  ${({read}) =>
    read &&
    `
    background-color: ${Colors.border};
  `}
`;

export const NotificationInfoStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX1}px;
`;
