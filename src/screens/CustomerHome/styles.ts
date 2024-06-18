import {Colors, Metrics} from '@/theme';
import {TColorsType} from '@/theme';
import {TouchableHighlight, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';

const AnimatedTouchableHighlight =
  Animated.createAnimatedComponent(TouchableHighlight);
const AnimatedView = Animated.createAnimatedComponent(View);

export const CHContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.bgLight};
`;

export const CHContentStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: Metrics.unitX3,
    padding: Metrics.unitX3,
    flexGrow: 1,
  },
})`
  flex: 1;
`;

const BigActionRowCSS = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

const BigActionColumnCSS = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

export const BigActionStyled = styled(AnimatedTouchableHighlight)<{
  backgroundColor: TColorsType;
  direction: 'row' | 'column';
}>`
  border-radius: 18px;
  padding: 18px;
  padding-bottom: 0;
  background: ${({backgroundColor}) => Colors[backgroundColor]};
  ${({direction}) => direction === 'row' && BigActionRowCSS}
  ${({direction}) => direction === 'column' && BigActionColumnCSS}
`;

export const SplashAnimatedViewStyled = styled(AnimatedView)``;

export const BigActionTextStyled = styled.View`
  padding-bottom: 18px;
  flex: 1;
  gap: 2px;
`;

export const LineStyled = styled.View<{customColor?: string}>`
  width: 100%;
  background-color: ${({customColor}) => customColor || Colors.border};
  height: 1px;
`;

export const ShareQrButtonContentStyled = styled.View`
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CHTabsStyled = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 18px;
`;

export const CHTabsContentStyled = styled(AnimatedView)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 18px;
`;

export const CHActionStyled = styled(AnimatedTouchableHighlight)<{
  color?: TColorsType;
  height?: number;
}>`
  padding: 18px;
  border-radius: 18px;
  background: ${({color}) => Colors[color || 'white1']};
  position: relative;
  ${({height}) => height && `height: ${height}px;`}
  max-width:${Metrics.smWidth / 2 - 12}px;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

export const SplashViewStyled = styled(AnimatedView)<{
  bottom: number;
  right: number;
}>`
  position: absolute;
  bottom: ${({bottom}) => bottom}px;
  right: ${({right}) => right}px;
`;
