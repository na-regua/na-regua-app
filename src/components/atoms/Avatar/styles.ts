import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const LoaderWrapperStyle = styled.View`
  position: absolute;
`;

export const AvatarContentStyle = styled.TouchableOpacity<{
  size: number;
  loading?: boolean;
}>`
  background-color: ${Colors.border};
  border-radius: ${({size}) => size / 2}px;
  justify-content: center;
  align-items: center;
  min-width: ${({size}) => size}px;
  min-height: ${({size}) => size}px;
  position: relative;

  ${({loading}) =>
    loading &&
    `
    opacity: 0.5;
  `}
`;

export const AvatarPreviewStyle = styled.Image<{size: number}>`
  border-radius: ${({size}) => size / 2}px;
  object-fit: cover;
  min-width: ${({size}) => size}px;
  min-height: ${({size}) => size}px;
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
