import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const NotificationsContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.bgLight};
`;

export const NotificationContentStyle = styled.View`
  flex: 1;
  gap: ${Metrics.unitX3}px;
`;

export const TouchableLinkStyled = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: red;
`;

export const NotificationHeaderStyled = styled.View`
  align-self: stretch;
  padding: ${Metrics.unitX3}px;
  padding-bottom: 0;
`;

export const NotificationHeaderRowStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TabsContainerStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.border};
`;

export const TabItemStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{active?: boolean}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;

  ${({active}) =>
    active &&
    `
  padding-bottom: 6px;
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.primary};
  `}
`;

export const NotificationListStyle = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
`;

export const TabGroupStyled = styled.View`
  flex: 1;
`;

export const LoaderContainerStyled = styled.View`
  padding: ${Metrics.unitX3}px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
