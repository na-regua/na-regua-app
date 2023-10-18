import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: Metrics.smPadding,
    width: Metrics.screenWidth,
    position: 'relative',
  },
  containerInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInfoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  containerInfoIcon: {
    borderRadius: 8,
    width: 32,
    height: 32,
    backgroundColor: Colors.main,
  },
  title: {
    flexDirection: 'column',
    gap: 4,
    paddingTop: Metrics.smPadding,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.border,
    width: Metrics.screenWidth,
    height: 1,
  },
});
