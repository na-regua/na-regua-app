import {Colors, Metrics} from '@/theme';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

export const barberLoginStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export const ContainerStyle = styled.ScrollView`
  flex: 1;
  background: ${Colors.bgContrast};
  padding: 42px;
`;

export const ContentStyle = styled.View`
  flex: 1;
  width: 100%;
  gap: ${Metrics.unitX4}px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;
  min-width: 240px;
`;

export const FooterContainerStyle = styled.View`
  align-self: stretch;
  gap: ${Metrics.unitX4}px;
  justify-content: center;
  align-items: center;
`;

export const TouchableWithoutFeedbackStyle = styled(TouchableWithoutFeedback)`
  flex: 1;
`;
