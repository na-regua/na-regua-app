import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.main,
    position: 'relative',
  },
  content: {
    flex: 1,
    width: Metrics.screenWidth,
    padding: Metrics.smPadding,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
});
