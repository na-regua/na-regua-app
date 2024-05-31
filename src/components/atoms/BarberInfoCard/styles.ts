import {Colors, Metrics} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import styled from 'styled-components/native';

export const BarberInfoStyled = styled.View`
  align-self: stretch;
  padding: ${Metrics.unitX2}px;
  border-radius: ${Metrics.unitX2}px;
  gap: ${Metrics.unitX2}px;
  background: ${Colors.main}${hexPercentage[10]};
`;

export const BarberInfoImageWrapper = styled.View`
  position: relative;
`;

export const BarberInfoCardImageStyled = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin: 6px 0;
`;

export const DotSeparatorStyled = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 2px;
  background-color: ${Colors.black2};
`;
