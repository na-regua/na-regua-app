import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  grow1: {
    flexGrow: 1,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    gap: 18,
  },
});

export const ContainerStyles = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
  padding: 0 ${Metrics.smPadding}px;
`;

export const ContentStyle = styled.View`
  flex: 1;
  gap: ${Metrics.smPadding}px;
  padding: ${Metrics.smPadding}px;
`;

export const ScrollContentStyle = styled.ScrollView``;

export const ContentBackLinkStyle = styled.TouchableOpacity`
  gap: 2px;
  flex-direction: row;
  align-items: center;
`;

export const ContentHeaderStyle = styled.View`
  gap: 4px;
`;

export const ConfigCardStyle = styled.View`
  border: 1px solid ${Colors.border};
  border-radius: 8px;

  padding: 12px;
  gap: 18px;
`;

export const GroupConfigStyle = styled.View`
  gap: 8px;
`;
