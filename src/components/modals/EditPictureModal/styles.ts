import {Metrics} from '@/theme';
import {CachedImage} from '@georstat/react-native-image-cache';
import styled from 'styled-components/native';

export const ModalContainerStyle = styled.View`
  flex-direction: column;
  gap: ${Metrics.unitX3}px;
`;

export const ModalContainerTitleStyle = styled.View`
  gap: ${Metrics.unitX2}px;
  align-items: center;
  justify-content: center;
`;

export const ModalContainerActionsStyle = styled.View`
  gap: ${Metrics.unitX2}px;
`;

export const ImagePreviewStyle = styled(CachedImage).attrs({
  resizeMode: 'cover',
  imageStyle: {
    borderRadius: 12,
  },
})<{
  width: number;
  height: number;
}>`
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
`;
