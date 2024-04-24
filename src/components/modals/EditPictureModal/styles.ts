import {Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ModalContainerStyle = styled.View`
  flex-direction: column;
  gap: ${Metrics.paddingX3}px;
`;

export const ModalContainerTitleStyle = styled.View`
  gap: ${Metrics.paddingX2}px;
  align-items: center;
  justify-content: center;
`;

export const ModalContainerActionsStyle = styled.View`
  gap: ${Metrics.paddingX2}px;
`;

export const ImagePreviewStyle = styled.Image.attrs({resizeMode: 'cover'})`
  width: 96px;
  height: 96px;
  border-radius: 6px;
`;
