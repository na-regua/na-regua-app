import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const QRWrapperStyle = styled.View<{
  size: number;
  padding: number;
  borderRadius: number;
}>`
  align-items: center;
  justify-content: center;

  background-color: ${Colors.white3};

  width: ${({size, padding}) => size + padding}px;
  height: ${({size, padding}) => size + padding}px;
  border-radius: ${({borderRadius}) => borderRadius}px;
`;
