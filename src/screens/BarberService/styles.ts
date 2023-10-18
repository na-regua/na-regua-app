import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgLight,
    gap: Metrics.smPadding,
  },
  titleWrapper: {
    gap: 4,
  },
  backlink: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
