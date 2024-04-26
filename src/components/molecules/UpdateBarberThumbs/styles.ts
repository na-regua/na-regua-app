import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const CardGroupStyle = styled.View`
  gap: 12px;
`;

export const ContentStyle = styled.View`
  flex: 1;
  padding: ${Metrics.smPadding}px;
  gap: ${Metrics.smPadding}px;
  flex-direction: column;
`;

export const CardStyle = styled.View`
  border: 1px solid ${Colors.border};
  border-radius: 8px;

  padding: 12px;
  gap: 18px;
`;

export const FileUploadRowStyle = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

export const PreviewWrapperStyle = styled.TouchableOpacity`
  border-width: 2px;
  border-color: ${Colors.main};
  border-radius: 4px;
  position: relative;
  border-style: solid;
`;

export const ImagePreview = styled.Image.attrs({
  resizeMode: 'cover',
})<{width: number; height: number}>`
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
`;
