import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  splash: {
    width: Metrics.screenWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    backgroundColor: Colors.main,
  },
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.border,
    position: 'relative',
  },
  logoHeader: {
    width: 32,
    height: 32,
    backgroundColor: Colors.white3,
    borderRadius: 4,
  },
  logoHeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    flex: 1,
    width: Metrics.screenWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: Metrics.mdPadding,
    padding: Metrics.mdPadding,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
