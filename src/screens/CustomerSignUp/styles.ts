import {Colors, Metrics} from '@/theme';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

export const CSUContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.bgLight};
`;

export const CSUHeaderStyled = styled.View`
  gap: 6px;
`;

export const CSUAvatarWrapperStyled = styled.View`
  align-items: center;
`;

export const CSUContentStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX4}px;
  padding-bottom: 0;
  justify-content: flex-start;
  padding: 18px;
`;

export const CSUContentFormStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX3}px;
`;

export const CSUNoFeedbackStyled = styled(TouchableWithoutFeedback)`
  flex: 1;
`;
