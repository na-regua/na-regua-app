import {Typography} from '@/components/atoms';
import {Colors, Metrics} from '@/theme';
import {TColorsType} from '@/theme';
import {Animated, View} from 'react-native';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(View);

export const OnQueueHeaderContainerStyled = styled(AnimatedView)`
  gap: ${Metrics.unitX3}px;
`;

export const OnQueueTitleDotStyled = styled(AnimatedView)<{
  color: TColorsType;
}>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${({color}) => Colors[color]};
`;

export const OnQueueTitleGroupStyled = styled.View`
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
`;

export const OnQueueHeaderStyled = styled.View`
  gap: 12px;
`;

export const OnQueueHeaderActionsStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
`;

export const OnQueueHeaderRowStyled = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
`;

export const OnQueueTitleStyled = styled(Typography)``;

export const OnQueueFiltersStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const OnQueueFilterOldTicketsStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{
  active?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({active}) => (active ? Colors.primary : Colors.border)};
`;
