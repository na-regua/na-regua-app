import {BOTTOM_NAV_HEIGHT} from '@/navigation/BottomNav/styles';
import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const QueueContainerStyled = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

// export const QueueScrollContentStyled = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     flex: 1,
//     flexGrow: 1,
//     padding: 18,
//   },
// })`
//   flex: 1;
//   margin-bottom: ${`${BOTTOM_NAV_HEIGHT}px`};
// `;

export const QueueScrollContentStyled = styled.View`
  flex: 1;
  margin-bottom: ${BOTTOM_NAV_HEIGHT}px;
  padding: ${Metrics.unitX3}px;
  gap: 18px;
`;
