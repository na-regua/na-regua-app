import {Colors, Metrics} from '@/theme';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.border};
  gap: ${Metrics.unit(3)}px;
`;

const ScheduleList = styled(Animated.ScrollView)`
  flex: 1;
  align-self: stretch;
`;

export default {
  Container,
  ScheduleList,
};
