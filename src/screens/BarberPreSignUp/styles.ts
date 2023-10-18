import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgLight,
  },
  content: {
    flex: 1,
    width: Metrics.screenWidth,
    flexDirection: 'column',
    gap: 18,
    justifyContent: 'flex-end',
    padding: Metrics.smPadding,
  },
  actions: {
    flexDirection: 'column',
    gap: Metrics.smPadding,
  },
  router: {
    flex: 1,
  },
});
