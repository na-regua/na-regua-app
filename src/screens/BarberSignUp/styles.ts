import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ScrollContentStyle = styled.ScrollView`
  flex: 1;
  width: ${Metrics.screenWidth}px;
  flex-direction: column;
  gap: 18px;
`;

export const ContentStyle = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${Metrics.smPadding}px;
  gap: 18px;
`;
