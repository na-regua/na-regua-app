import {Colors} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import styled from 'styled-components/native';

export const PickerWrapperStyle = styled.View`
  flex-direction: row;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
`;

export const PickerStyle = styled.TouchableOpacity<{
  width: number;
  height: number;
}>`
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  justify-content: center;
  align-items: center;
  background-color: ${Colors.border};
  border-width: 2px;
  border-style: dashed;
  border-color: ${Colors.default};
  border-radius: 4px;
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
  z-index: 1;
`;

export const LoaderWrapperStyle = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #333333 ${hexPercentage[20]};
  z-index: 9;
`;
