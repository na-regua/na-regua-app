import {Colors} from '@/theme';
import styled from 'styled-components/native';
import {AnimatedTouchableOpacity} from '../AnimatedComponents';
import {CachedImage} from '@georstat/react-native-image-cache';

export const ContainerStyle = styled(AnimatedTouchableOpacity)`
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  gap: 12px;
  background-color: ${Colors.border};

  ${({disabled}) =>
    disabled &&
    `
    background-color: ${Colors.disabled};
  `}
`;

export const IconWrapperStyle = styled.View`
  width: 42px;
  height: 42px;
  border-radius: ${42 / 2}px;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
`;

export const AvatarStyled = styled(CachedImage).attrs({
  resizeMode: 'cover',
})<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
`;
