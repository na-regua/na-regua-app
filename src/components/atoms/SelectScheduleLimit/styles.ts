import {Colors} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    gap: 12,
  },
});

export const ContainerStyle = styled.View`
  gap: 8px;
`;

export const ScrollContentStyle = styled.ScrollView`
  flex-grow: 1;
`;

export const SelectScheduleStyle = styled.TouchableOpacity<{
  active?: boolean;
}>`
  padding: 4px 12px;
  background-color: ${Colors.border};
  border-radius: 4px;

  ${({active}) =>
    active &&
    `
    background-color: ${Colors.main};
  `}
`;
