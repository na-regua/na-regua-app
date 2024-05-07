import {Button} from '@/components/atoms';
import {Colors, Metrics} from '@/theme';
import {EdgeInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const OnQueueContainerStyled = styled.View<{
  fs: boolean;
  insets: EdgeInsets;
}>`
  flex: 1;
  background: ${Colors.bgLight};

  ${({fs, insets}) =>
    fs &&
    `
    padding-top: ${insets.top}px;
    padding-bottom: ${insets.bottom}px;
    padding-left: ${insets.left}px;
    padding-right: ${insets.right}px;
  `}
`;

export const OnQueueContentStyled = styled.View<{fs: boolean}>`
  flex: 1;
  gap: 18px;
  ${({fs}) => fs && `padding: ${Metrics.unitX3}px`};
`;

export const OnQueueActionsStyled = styled.View`
  gap: ${Metrics.unitX3}px;
`;

export const OnQueueButtonStyled = styled(Button)`
  flex: 1;
`;
export const OnQueueActionsRowStyled = styled.View`
  gap: ${Metrics.unitX3}px;
  flex-direction: row;
  align-items: center;
`;

export const OnQueueScrollStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 18,
  },
})`
  flex: 1;
`;

export const OnQueueLoaderWrapperStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
