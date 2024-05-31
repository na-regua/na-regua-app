import React, {PropsWithChildren} from 'react';
import {MenuItemActionStyled} from './styles';
import {SlideInRight} from 'react-native-reanimated';

export type IMenuItemActionTheme = 'primary' | 'danger';

interface IMenuItemActionProps extends PropsWithChildren {
  theme: IMenuItemActionTheme;
  onPress?: () => void;
}

const MenuItemAction: React.FC<IMenuItemActionProps> = ({
  theme,
  children,
  onPress,
}) => {
  return (
    <MenuItemActionStyled
      entering={SlideInRight}
      colorScheme={theme}
      activeOpacity={0.8}
      onPress={onPress}>
      {children}
    </MenuItemActionStyled>
  );
};

export default MenuItemAction;
