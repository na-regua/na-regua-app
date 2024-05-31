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
