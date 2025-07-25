import {Colors} from '@/theme';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedScroll = Animated.createAnimatedComponent(ScrollView);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const HDPWrapperStyled = styled.View`
  width: 100%;
  align-self: flex-start;
`;

export const HDPScrollStyled = styled(AnimatedScroll).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    gap: 18,
  },
})`
  flex-direction: row;
  /* overflow: visible; */
`;

export const HDPDayStyled = styled(AnimatedTouchableOpacity)<{
  active?: boolean;
  width?: number;
}>`
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  padding: 12px;
  padding-top: 9px;
  padding-bottom: 9px;
  overflow: visible;
  background: ${({active}) => (active ? Colors.primary : Colors.border)};
  gap: 6px;
  align-self: stretch;
  width: 58px;
  height: 76px;
`;

export const HDPTextGroupStyled = styled.View`
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const HDPDotStyled = styled.View<{active?: boolean}>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: ${({active}) => (active ? Colors.white3 : Colors.main)};
`;
