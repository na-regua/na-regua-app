import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const WorkDaysContainerStyle = styled.View`
  gap: 8px;
`;

export const SelectDaysContainerStyle = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
})`
  flex-grow: 1;
`;

export const SelectDayStyle = styled.TouchableOpacity<{active?: boolean}>`
  border-radius: 4px;
  min-width: 28px;
  min-height: 38px;
  align-items: center;
  justify-content: center;

  ${({active}) =>
    active &&
    `
    background-color: ${Colors.primary};
  `}
`;
