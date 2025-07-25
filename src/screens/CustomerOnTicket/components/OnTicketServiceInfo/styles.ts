import {Colors} from '@/theme';
import styled from 'styled-components/native';

const randomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 60%, 60%)`;
};

export const AdditionalServiceBadgeStyled = styled.View`
  background-color: ${randomPastelColor()};
  border-radius: 30px;
  padding: 2px 12px;
  align-items: center;
  justify-content: center;
`;
export const OnTicketInfoStyled = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const OnTicketIconWrapperStyled = styled.View`
  align-items: center;
  justify-content: center;
  background: ${Colors.secondary};
  width: 42px;
  height: 42px;
  border-radius: 12px;
`;
