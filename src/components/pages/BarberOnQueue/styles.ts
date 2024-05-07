import {Button, Typography} from '@/components/atoms';
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

export const OnQueueHeaderStyled = styled.View`
  gap: 12px;
`;

export const OnQueueHeaderActionsStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
`;

export const OnQueueHeaderRowStyled = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
`;

export const OnQueueTitleStyled = styled(Typography)``;

export const OnQueueFiltersStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const OnQueueFilterOldTicketsStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{
  active?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({active}) => (active ? Colors.primary : Colors.border)};
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
