import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    padding: 32,
  },
  menuItem: {
    flex: 1,
  },
  refreshControl: {
    backgroundColor: 'transparent',
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${Colors.bgLight};
  padding: 0 ${Metrics.smPadding}px;
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
  flex-direction: column;
  gap: 18px;
  flex: 1;
`;
