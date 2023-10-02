import {Colors, Fonts} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  input: {},
  codeInput: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'solid',
    textAlign: 'center',
    color: Colors.black3,
    fontSize: 14,
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
  },
  codeInputFocused: {
    color: Colors.primary,
    borderColor: Colors.primary,
  },
});

export const codeInputStyle = {
  default: styles.codeInput,
  focused: [styles.codeInput, styles.codeInputFocused],
};
