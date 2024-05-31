import {Colors} from '@/theme';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

export const SwitchWrapperStyled = styled.TouchableOpacity<{
  active?: boolean;
  width: number;
  height: number;
}>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  background-color: ${({active}) => (active ? Colors.primary : Colors.border)};
  border-radius: 30px;
  position: relative;
  justify-content: center;
`;

export const SwitchDot = styled(AnimatedView)<{
  active?: boolean;
  width: number;
}>`
  width: ${({width}) => width}px;
  height: ${({width}) => width}px;
  border-radius: ${({width}) => Math.round(width / 2)}px;
  background-color: ${({active}) =>
    active ? Colors.default : Colors.borderHover};
  position: absolute;
`;
