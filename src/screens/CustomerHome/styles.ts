import {Colors, Metrics, TColorsType} from '@/theme';
import colors from '@/theme/colors';
import {CachedImage} from '@georstat/react-native-image-cache';
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
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

export const CHLeftContent = styled.View`
  flex-direction: column;
  gap: 18px;
  width: 49%;
`;
export const CHRightContent = styled.View`
  flex-direction: column;
  gap: 18px;
  width: 49%;
`;

export const CHActionStyled = styled(AnimatedTouchableHighlight)<{
  color?: TColorsType;
  height?: number;
}>`
  padding: 12px;
  border-radius: 18px;
  background: ${({color}) => Colors[color || 'white1']};
  position: relative;
  ${({height}) => height && `height: ${height}px;`}
  max-width:${Metrics.smWidth / 2 - 12}px;
  overflow: hidden;
  width: 100%;
  gap: 4px;
  flex-wrap: wrap;
`;

export const SplashViewStyled = styled(AnimatedView)<{
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
}>`
  position: absolute;

  ${({top}) => !!top && `top: ${top}px;`}
  ${({bottom}) => !!bottom && `bottom: ${bottom}px;`}
  ${({left}) => !!left && `left: ${left}px;`}
  ${({right}) => !!right && `right: ${right}px;`}
`;

export const TodayScheduleBarberAvatar = styled(CachedImage).attrs({
  imageStyle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: colors.white3,
  },
})``;
