import {Colors} from '@/theme';
import {TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {IMenuItemActionTheme} from './MenuItemAction';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const MenuItemActionStyled = styled(AnimatedTouchableOpacity)<{
  colorScheme: IMenuItemActionTheme;
}>`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 42px;
  border-radius: 12px;
  background-color: ${({colorScheme}) => Colors[colorScheme]};
`;
