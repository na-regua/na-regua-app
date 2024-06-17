import {Colors, Fonts, Metrics} from '@/theme';
import {TextStyle, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const BOTTOM_NAV_HEIGHT = 66;

export const labelStyle: TextStyle = {
  fontWeight: Fonts.weights.medium,
  fontFamily: Fonts.types.medium,
};

export const shadowStyle: ViewStyle = {
  shadowColor: Colors.black1,
  shadowOffset: {
    height: -3,
    width: 0,
  },
  shadowOpacity: 0.1,
  elevation: 2,
};

export const FloatingContainerStyle = styled(Animated.View)`
  background-color: ${Colors.bgLight};
  position: absolute;
  bottom: 0;
  width: ${Metrics.screenWidth}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 18px;
  height: ${`${BOTTOM_NAV_HEIGHT}px`};
  border-width: 1px;
  border-top-color: ${Colors.border};
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
`;

export const NavItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;

  gap: 2px;
`;
