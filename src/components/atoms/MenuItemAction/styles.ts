import {StyleSheet, ViewStyle} from 'react-native';
import {IMenuItemActionTheme} from './MenuItemAction';
import {Colors} from '@/theme';

export const menuItemActionStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    minWidth: 42,
    maxWidth: 42,
    minHeight: 40,
    borderRadius: 8,
  },
});

export const menuItemActionThemeStyles: Record<
  IMenuItemActionTheme,
  ViewStyle
> = {
  danger: {
    backgroundColor: Colors.danger,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
};
