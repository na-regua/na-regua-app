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
    alignItems: 'center',
    padding: 18,
  },
  sendAgainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  validationContainer: {
    flex: 1,
    gap: 18,
  },
  button: {
    width: Metrics.smWidth,
  },
});
