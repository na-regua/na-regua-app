import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const CHHScrollViewStyled = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    gap: 18,
  },
})<{
  hasSelected?: boolean;
  insetBottom?: number;
  reachedEnd?: boolean;
}>`
  flex: 1;
  align-self: stretch;
  position: relative;
  max-height: 440px;

  ${({hasSelected, insetBottom}) =>
    hasSelected &&
    `
    margin-bottom: ${(insetBottom || 18) + 36}px;
  `}
`;
