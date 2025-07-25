import {Colors, Metrics} from '@/theme';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';

export const CVContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.bgLight};
`;

export const CVHeaderStyled = styled.View`
  gap: 6px;
`;

export const CVAvatarWrapperStyled = styled.View`
  align-items: center;
`;

export const CVContentStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX4}px;
  padding-bottom: 0;
  justify-content: flex-start;
  padding: 18px;
`;

export const CVContentFormStyled = styled.View`
  flex: 1;
  gap: ${Metrics.unitX3}px;
`;

export const CVNoFeedbackStyled = styled(TouchableWithoutFeedback)`
  flex: 1;
`;

export const CVCodeInput = styled.View`
  flex: 1;
  gap: 18px;
`;
