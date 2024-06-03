import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const BarberInfoImageWrapper = styled.View`
  position: relative;
`;

export const BarberInfoCardImageStyled = styled.Image.attrs({
  resizeMode: 'cover',
})<{radius: number}>`
  width: 48px;
  height: 48px;
  border-radius: ${({radius}) => radius}px;
`;

export const DotSeparatorStyled = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 2px;
  background-color: ${Colors.black2};
`;
