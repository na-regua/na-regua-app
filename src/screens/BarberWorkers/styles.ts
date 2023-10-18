import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgLight,
    paddingHorizontal: Metrics.smPadding,
  },
  content: {
    flex: 1,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
    flexDirection: 'column',
  },
  titleWrapper: {
    gap: 4,
  },
  backlink: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    width: Metrics.smWidth,
    gap: 18,
  },
  scrollContent: {flex: 1},
  loaderWrapper: {
    flex: 1,
    padding: 32,
  },
  menuItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  menuItem: {
    flex: 1,
  },
});
