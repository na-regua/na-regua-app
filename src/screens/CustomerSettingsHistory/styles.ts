import {Colors} from '@/theme';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const CustomerHistoryList = styled(Animated.ScrollView)`
  flex: 1;
  align-self: stretch;
`;
