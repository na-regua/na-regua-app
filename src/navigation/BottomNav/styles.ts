import {Colors, Metrics} from '@/theme';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

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

export const shadowStyle: ViewStyle = {
  shadowColor: Colors.black1,
  shadowOffset: {
    height: -2,
    width: 0,
  },
  shadowOpacity: 0.05,
  shadowRadius: 4,
};

export const NavItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
`;
