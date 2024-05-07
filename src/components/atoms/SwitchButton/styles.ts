import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const SwitchButtonContainerStyled = styled.View`
  gap: 8px;
`;

export const SwitchButtonWrapperStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const SwitchButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{
  left?: boolean;
  active?: boolean;
}>`
  padding: 4px 18px;
  background-color: ${({active}) => (active ? Colors.primary : 'transparent')};
  border: 1px solid ${Colors.primary};

  ${({left}) =>
    left
      ? 'border-top-left-radius: 4px; border-bottom-left-radius: 4px;'
      : 'border-top-right-radius: 4px; border-bottom-right-radius: 4px;'}
`;
