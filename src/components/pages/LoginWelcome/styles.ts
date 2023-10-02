import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: Metrics.screenWidth,
    flexDirection: 'column',
    padding: Metrics.mdPadding,
    gap: Metrics.mdPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: Colors.bgLight,
    width: Metrics.screenWidth - 2 * Metrics.mdPadding,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
    borderRadius: 18,
  },
  cardHeader: {
    flexDirection: 'column',
    gap: 8,
  },
});
