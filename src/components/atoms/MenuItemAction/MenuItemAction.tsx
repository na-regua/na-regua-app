import React, {PropsWithChildren} from 'react';
import {FadeInRight} from 'react-native-reanimated';
import {MenuItemActionStyled} from './styles';
import Loader from '../Loader/Loader';
import {Colors} from '@/theme';

export type IMenuItemActionTheme = 'primary' | 'danger';

interface IMenuItemActionProps extends PropsWithChildren {
  theme: IMenuItemActionTheme;
  loading?: boolean;
  onPress?: () => void;
}

const MenuItemAction: React.FC<IMenuItemActionProps> = ({
  theme,
  children,
  onPress,
  loading,
}) => {
  return (
    <MenuItemActionStyled
      entering={FadeInRight.delay(100)}
      colorScheme={theme}
      activeOpacity={0.8}
      onPress={onPress}>
      {!loading ? (
        children
      ) : (
        <Loader strokeWidth={2} color={Colors.white3} size="48" />
      )}
    </MenuItemActionStyled>
  );
};

export default MenuItemAction;
