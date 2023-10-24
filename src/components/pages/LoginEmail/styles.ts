import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: Metrics.mdPadding,
  },
  headerWrapper: {
    flexDirection: 'column',
    gap: 8,
  },
  headerSubtitle: {
    textAlign: 'justify',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: Colors.bgLight,
    width: Metrics.screenWidth - 2 * Metrics.mdPadding,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
    borderRadius: 18,
  },
});

export const CardStyle = styled.View`
  flex-direction: column;
  background-color: ${Colors.bgLight};
  width: ${Metrics.smWidth}px;
  padding: ${Metrics.smPadding}px;
  gap: ${Metrics.smPadding}px;
  border-radius: 18px;
`;
