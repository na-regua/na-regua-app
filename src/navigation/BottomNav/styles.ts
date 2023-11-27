import {Colors, Fonts, Metrics} from '@/theme';
import {TextStyle, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

export const labelStyle: TextStyle = {
  fontWeight: Fonts.weights.medium,
  fontFamily: Fonts.types.medium,
};

export const shadowStyle: ViewStyle = {
  shadowColor: Colors.black1,
  shadowOffset: {
    height: -2,
    width: 0,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
};

export const FloatingContainerStyle = styled.View`
  background-color: ${Colors.bgLight};
  position: absolute;
  bottom: 0;
  width: ${Metrics.screenWidth}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 18px;
`;

export const NavItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8px;

  gap: 2px;
`;
