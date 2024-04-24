import {Colors} from '@/theme';
import {TColorsType} from '@/theme/colors';
import styled from 'styled-components/native';

export const AvoidKeyboardStyle = styled.View<{
  paddingBottom?: number;
  backgroundColor?: TColorsType;
}>`
  flex: 1;
  padding-bottom: ${({paddingBottom}) => paddingBottom}px;
  background-color: ${({backgroundColor}) =>
    backgroundColor && Colors[backgroundColor]};
`;
