import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
  },
  refreshControl: {
    backgroundColor: 'transparent',
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ContentStyle = styled.View`
  flex: 1;
  padding: ${Metrics.smPadding}px;
  gap: ${Metrics.smPadding}px;
  flex-direction: column;
`;

export const ContentHeaderStyle = styled.View`
  gap: 4px;
`;

export const ContentBackLinkStyle = styled.TouchableOpacity`
  gap: 2px;
  flex-direction: row;
  align-items: center;
`;

export const ContentScrollContentStyle = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  gap: 18px;
`;

export const ContentActionsStyle = styled.View`
  width: ${Metrics.smWidth}px;
  gap: 18px;
`;

export const MenuItemRowStyle = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
`;

export const MenuItemsWrapperStyle = styled.View`
  gap: 18px;
  flex-grow: 1;
`;
