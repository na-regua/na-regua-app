import {Colors, Metrics} from '@/theme';
import {ScrollView, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const PageCardContainer = styled(AnimatedView)`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${Colors.bgLight};
  padding-top: ${Metrics.unitX3}px;

  flex: 1;
  gap: ${Metrics.unitX2}px;
`;

export const PageCardContentStyled = styled(AnimatedView)`
  flex: 1;
  gap: ${Metrics.unitX3}px;
`;

export const PageCardScrollStyled = styled(AnimatedScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    gap: Metrics.unitX3,
    padding: Metrics.unitX3,
    paddingBottom: 0,
    paddingTop: Metrics.unitX2,
    overflow: 'hidden',
  },
})`
  flex: 1;
`;

export const PageFooterStyled = styled(AnimatedView)`
  padding: ${Metrics.unitX1}px ${Metrics.unitX3}px;
  padding-bottom: 0;
  background: ${Colors.bgLight};
`;
