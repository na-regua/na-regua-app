import {Colors, Metrics} from '@/theme';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

export const barberLoginStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export const ContainerStyle = styled.ScrollView`
  flex: 1;
  background: ${Colors.bgContrast};
`;

export const ContentStyle = styled.View`
  flex: 1;
  padding: 42px;
  padding-bottom: 24px;
  width: 100%;
  gap: ${Metrics.paddingX4}px;
  align-items: center;
  justify-content: space-between;
`;

export const FooterContainerStyle = styled.View`
  gap: ${Metrics.paddingX4}px;
  justify-content: center;
  align-items: center;
`;

export const TouchableWithoutFeedbackStyle = styled(TouchableWithoutFeedback)`
  flex: 1;
`;
