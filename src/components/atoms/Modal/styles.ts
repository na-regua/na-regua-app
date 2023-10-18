import {Colors} from '@/theme';
import {StyleSheet} from 'react-native';

export const modalStyles = StyleSheet.create({
  background: {
    shadowColor: Colors.black1,
    shadowOffset: {
      height: -2,
      width: 0,
    },
    shadowOpacity: 0.1,
    borderRadius: 32,
    backgroundColor: Colors.white3,
  },
  backdrop: {
    backgroundColor: Colors.black3,
    opacity: 0.2,
  },
  content: {
    padding: 18,
    flex: 1,
    gap: 18,
  },
});
