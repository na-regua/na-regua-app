import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import {menuItemActionStyles, menuItemActionThemeStyles} from './styles';

export type IMenuItemActionTheme = 'primary' | 'danger';

interface IMenuItemActionProps extends PropsWithChildren {
  theme: 'primary' | 'danger';
  onPress?: () => void;
}

const MenuItemAction: React.FC<IMenuItemActionProps> = ({
  theme,
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[menuItemActionStyles.container, menuItemActionThemeStyles[theme]]}
      activeOpacity={0.8}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default MenuItemAction;
