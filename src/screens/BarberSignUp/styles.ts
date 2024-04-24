import {Colors, Metrics} from '@/theme';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

export const barberSignupStyles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgContrast};
`;

export const TouchableWithoutFeedbackStyle = styled(TouchableWithoutFeedback)`
  flex: 1;
`;
