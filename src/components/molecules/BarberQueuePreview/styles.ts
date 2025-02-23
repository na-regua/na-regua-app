import {Colors, TColorsType, hexPercentage} from '@/theme';
import {CachedImage} from '@georstat/react-native-image-cache';
import styled from 'styled-components/native';

export const BQPContainerStyled = styled.View`
  width: 100%;
  flex-direction: column;
  align-self: stretch;
  padding: 12px;
  gap: 12px;
  background-color: ${Colors.primary};
  border-radius: 12px;
`;

export const BQPWrappingRow = styled.View`
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  justify-content: flex-start;
`;

export const BQPAvatarImage = styled(CachedImage).attrs({
  imageStyle: {
    borderRadius: 42,
  },
  resizeMode: 'cover',
})<{onError?: () => void}>`
  width: 42px;
  height: 42px;
`;

export const BQPHasMoreAvatars = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background-color: ${Colors.default + hexPercentage['20']};
  align-items: center;
  justify-content: center;
`;

export const BQPDotStyled = styled.View<{color?: TColorsType}>`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: ${({color}) => Colors[color || 'default']};
`;
