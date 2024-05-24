import {Colors, Metrics} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import {View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const QrScannerContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.border};
  gap: ${Metrics.unitX3}px;
`;

export const QrCodeContentStyled = styled.View`
  flex: 1;
  padding-left: 18px;
  padding-right: 18px;
`;

export const QrScannerCardStyled = styled.View`
  padding: ${Metrics.unitX3}px;
  align-items: center;
  background-color: ${Colors.bgLight};
  border-radius: 30px;
  flex-direction: column;
  overflow: hidden;
  gap: ${Metrics.unitX3}px;
  flex: 1;
`;

export const QrScannerBorderStyled = styled.View`
  border: 4px solid ${Colors.main};
  border-radius: 12px;
  overflow: hidden;
  flex: 1;
  width: 100%;
`;

export const CameraStyle: ViewStyle = {
  flex: 1,
  width: '100%',
};

export const CameraStyles: ViewStyle = {
  flex: 1,
  marginTop: -2,
  marginLeft: -2,
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const AnimatedSplashViewStyled = styled(AnimatedView)``;

export const CustomBottomSheetOverlayStyled = styled(AnimatedView)`
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
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
