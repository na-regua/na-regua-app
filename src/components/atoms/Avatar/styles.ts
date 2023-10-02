import {Colors} from '@/theme';
import {StyleSheet, ViewStyle} from 'react-native';

export const styles = StyleSheet.create({
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.border,
    padding: 4,
    borderRadius: 5000000,
  },
  activeAvatarWrapper: {
    borderColor: Colors.main,
  },
  avatarContent: {
    flex: 1,
    backgroundColor: Colors.border,
    borderRadius: 5000000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5000000,
    resizeMode: 'cover',
  },
});

export const avatarWrapperStyle: Record<string, ViewStyle | ViewStyle[]> = {
  active: [styles.avatarWrapper, styles.activeAvatarWrapper],
  default: styles.avatarWrapper,
};
