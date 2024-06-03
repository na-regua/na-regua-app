import {Colors, Fonts} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const SwipeButtonWrapperStyled = styled(Animated.View)<{height: number}>`
  height: ${({height}) => height}px;
  border-radius: 12px;
  background-color: ${Colors.primary + hexPercentage[10]};
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const SwipeButtonTextStyled = styled(Animated.Text)`
  font-size: 14px;
  font-family: ${Fonts.types.semiBold};
  font-weight: ${Fonts.weights.semiBold};
  z-index: 2;
`;

export const SwipeButtonColorWaveStyled = styled(Animated.View)<{
  height: number;
}>`
  height: ${({height}) => height}px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  border-radius: 12px;
  background-color: ${Colors.primary};
`;

export const SwipeButtonLoaderWrapper = styled(Animated.View)`
  position: absolute;
  z-index: 3;
`;

export const SwipeButtonDotStyled = styled(Animated.View)<{
  size: number;
  padding: number;
}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: 8px;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${({padding}) => padding}px;
  z-index: 3;
`;
