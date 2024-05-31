import {BOTTOM_NAV_HEIGHT} from '@/navigation/BottomNav/styles';
import {Colors, Metrics} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ScrollContentStyle = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
  },
})`
  flex: 1;
  margin-bottom: ${`${BOTTOM_NAV_HEIGHT}px`};
`;

export const HeaderStyle = styled.View`
  gap: 2px;
`;

export const BarberProfileStyle = styled.View`
  gap: 8px;
  position: relative;
  justify-content: flex-start;
  align-items: center;
`;

export const BarberProfileInfoStyle = styled.View`
  justify-items: center;
  align-content: center;
  gap: 4px;
`;

export const QRWrapperStyle = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;

export const MenuWrapperStyle = styled.View`
  gap: 18px;
  flex: 1;
`;

export const MenuItemStyle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${Colors.bgLight};
  border-radius: 12px;
  gap: 12px;
  border: 1px solid ${Colors.border};
`;

export const MenuItemIconStyle = styled.View`
  justify-content: center;
  align-items: center;
`;

export const MenuItemInfoStyle = styled.View``;

export const LogoutLinkStyle = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  padding: 8px 0;
`;

export const BarberButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{open?: boolean}>`
  background-color: ${({open}) =>
    (open ? Colors.danger : Colors.success) + hexPercentage[20]};
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-direction: row;
`;
