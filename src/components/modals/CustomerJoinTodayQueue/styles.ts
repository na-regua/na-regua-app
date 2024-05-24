import {Colors, Metrics} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(View);

export const CustomBottomSheetOverlayStyled = styled(AnimatedView)`
  flex: 1;
  background-color: ${Colors.main}${hexPercentage[20]};
  position: absolute;
  top: 0;
  left: 0;
  width: ${Metrics.screenWidth}px;
  height: ${Metrics.screenHeight}px;
  align-items: centerl;
  justify-content: flex-end;
`;

export const CustomBottomSheetActionsStyled = styled.View`
  flex-direction: row;
  gap: ${Metrics.unitX3}px;
`;

export const BarberInfoStyled = styled.View`
  border-radius: 12px;
  background: ${Colors.main}${hexPercentage[20]};
  padding: 12px;
`;

export const QueueInfoStyled = styled.View`
  border-radius: 12px;
  background: ${Colors.border};
  padding: 12px;
  gap: 12px;
`;

export const OnTicketIconWrapperStyled = styled.View`
  align-items: center;
  justify-content: center;
  background: ${Colors.secondary};
  width: 48px;
  height: 48px;
  border-radius: 12px;
`;

export const CustomBottomSheetStyled = styled(AnimatedView)<{
  paddingBottom?: number;
}>`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 18px;
  padding-top: 30px;
  padding-bottom: ${({paddingBottom}) =>
    paddingBottom ? paddingBottom + 18 : 18}px;
  gap: 18px;
  background: ${Colors.bgLight};
  width: 100%;
`;
