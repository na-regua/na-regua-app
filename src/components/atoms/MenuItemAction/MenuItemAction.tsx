import React, {PropsWithChildren} from 'react';
import {FadeInRight} from 'react-native-reanimated';
import {MenuItemActionStyled} from './styles';

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
      entering={FadeInRight.delay(100)}
      colorScheme={theme}
      activeOpacity={0.8}
      onPress={onPress}>
      {children}
    </MenuItemActionStyled>
  );
};

export default MenuItemAction;
