import {Colors} from '@/theme';
import {CachedImage} from '@georstat/react-native-image-cache';
import styled from 'styled-components/native';

export const BarberInfoImageWrapper = styled.View`
  position: relative;
`;

export const BarberInfoCardImageStyled = styled(CachedImage).attrs({
  resizeMode: 'cover',
})`
  width: 48px;
  height: 48px;
`;

export const DotSeparatorStyled = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 2px;
  background-color: ${Colors.black2};
`;
