import {BOTTOM_NAV_HEIGHT} from '@/navigation/BottomNav/styles';
import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ScheduleContainerStyled = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
  overflow: hidden;
`;

// export const ScheduleScrollContentStyled = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     flex: 1,
//     flexGrow: 1,
//     padding: 18,
//   },
// })`
//   flex: 1;
//   margin-bottom: ${`${BOTTOM_NAV_HEIGHT}px`};
// `;

export const ScheduleScrollContentStyled = styled.View`
  flex: 1;
  margin-bottom: ${BOTTOM_NAV_HEIGHT}px;
  padding: ${Metrics.unitX3}px;
  gap: 18px;
`;

export const ScheduleGroupItemStyled = styled.View<{expand?: boolean}>`
  gap: 12px;

  ${({expand}) => (expand ? 'flex: 1;' : '')}
`;

export const ScheduleGroupItemHeaderStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
