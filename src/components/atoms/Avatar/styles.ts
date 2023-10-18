import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const AvatarContentStyle = styled.TouchableOpacity<{size: number}>`
  background-color: ${Colors.border};
  border-radius: 500000px;
  justify-content: center;
  align-items: center;
  min-width: ${({size}) => size}px;
  min-height: ${({size}) => size}px;
`;

export const AvatarPreviewStyle = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5000000;
  object-fit: cover;
`;

export const OffsetContainerStyle = styled.View<{
  active: boolean;
  size: number;
}>`
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: ${Colors.border};
  border-radius: 500000px;

  width: ${({size}) => size}px;
  height: ${({size}) => size}px;

  ${({active}) =>
    active &&
    `
    border-color: ${Colors.main};
  `}
`;
