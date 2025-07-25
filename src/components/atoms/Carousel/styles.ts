import {Colors} from '@/theme';
import {Animated, ScrollView, View} from 'react-native';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(View);

export const CarouselWrapperStyled = styled(AnimatedView)`
  flex: 1;
  background: ${Colors.border};
  border-radius: 18px;
  overflow: hidden;
`;

export const CarouselItemStyled = styled(AnimatedView)<{width: number}>`
  width: ${({width}) => `${width}px`};
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const CarouselScrollViewStyled = styled(AnimatedScrollView).attrs({
  contentContainerStyle: {
    flexDirection: 'row',
  },
})`
  flex: 1;
`;

export const CarouselDotStyled = styled.TouchableOpacity<{
  active?: boolean;
}>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${({active}) => (active ? Colors.main : Colors.default)};
  align-items: center;
  justify-content: center;
`;

export const CarouselActionsWrapperStyled = styled(AnimatedView)`
  flex-direction: row;
  padding: 24px;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const CarouselDotWrapperStyled = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

export const CarouselControlWrapperStyled = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;
