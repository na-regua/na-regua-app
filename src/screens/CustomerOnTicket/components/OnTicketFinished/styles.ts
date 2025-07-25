import {Colors, Metrics} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import {TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedTouchableView =
  Animated.createAnimatedComponent(TouchableOpacity);

export const CustomBottomSheetOverlayStyled = styled(
  AnimatedTouchableView,
).attrs({
  activeOpacity: 1,
})`
  flex: 1;
  background-color: ${Colors.main}${hexPercentage[20]};
  position: absolute;
  top: 0;
  left: 0;
  width: ${Metrics.screenWidth}px;
  height: ${Metrics.screenHeight}px;
  align-items: center;
  justify-content: flex-end;
`;

export const CustomBottomSheetActionsStyled = styled.View`
  flex-direction: row;
  gap: ${Metrics.unitX3}px;
`;
