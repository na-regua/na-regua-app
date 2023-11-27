import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ScrollContentStyle = styled.ScrollView`
  flex: 1;
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
  gap: 12px;
  flex: 1;
`;

export const MenuItemStyle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${Colors.bgLight};
  border-radius: 8px;
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
