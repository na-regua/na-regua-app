import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContainer: {
    gap: Metrics.smPadding,
    paddingVertical: 12,
  },
});

export const ScrollViewStyle = styled.ScrollView`
  flex-grow: 1;
`;

export const AvatarWrapperStyle = styled.View`
  align-items: center;
  justify-content: center;
`;

export const SelectIconStyle = styled.View`
  flex-direction: column;
  gap: 8px;
`;

export const SelectIconWrapperStyle = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 18px;
`;

export const SelectIconItemStyle = styled.TouchableOpacity<{active?: boolean}>`
  width: 48px;
  height: 48px;
  border-radius: ${48 / 2}px;

  justify-content: center;
  align-items: center;
  background: ${Colors.border};

  ${({active}) =>
    active &&
    `
    background: ${Colors.primary};
  `}
`;
