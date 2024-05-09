import {Colors, Metrics} from '@/theme';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

export const CHContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.bgLight};
`;

export const CHHeaderStyled = styled.View`
  gap: 6px;
`;

export const CHAvatarWrapperStyled = styled.View`
  align-items: center;
`;

export const CHContentStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX4}px;
  padding-bottom: 0;
  justify-content: flex-start;
  padding: 18px;
`;

export const CHContentFormStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX3}px;
`;

export const CHNoFeedbackStyled = styled(TouchableWithoutFeedback)`
  flex: 1;
`;

export const CHCodeInput = styled.View`
  flex: 1;
  gap: 18px;
`;
