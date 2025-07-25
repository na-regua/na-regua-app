import {Colors, Metrics} from '@/theme';
import {ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedScroll = Animated.createAnimatedComponent(ScrollView);

export const CalendarRowStyled = styled.View<{padding?: string}>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({padding}) => padding || '0'};
`;

export const CalendarScrollRowStyled = styled(AnimatedScroll).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    gap: Metrics.unitX3,
  },
})``;

export const CalendarTouchableScrollItemStyled = styled.TouchableOpacity<{
  width?: number;
}>`
  align-items: center;
  justify-content: center;
`;

export const CalendarRowItemStyled = styled.TouchableOpacity<{
  isActive?: boolean;
  showMarker?: boolean;
}>`
  min-width: 30px;
  max-width: 36px;
  justify-content: ${({showMarker}) => (showMarker ? 'flex-start' : 'center')};
  align-items: center;
  gap: 4px;
  padding: ${({showMarker}) => (showMarker ? '8px 2px' : '0')};
  border-radius: 4px;
  background: ${({isActive}) => (isActive ? Colors.primary : 'transparent')};
`;

export const CalendarDaysWrapper = styled.View`
  gap: 2px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CalendarRowItemDot = styled.View<{
  isMarked?: boolean;
  isActive?: boolean;
}>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: ${({isActive, isMarked}) =>
    !isMarked ? 'transparent' : isActive ? Colors.white3 : Colors.main};
`;
