import {Colors} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  viewShot: {
    flexGrow: 1,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrWrapper: {
    marginVertical: 18,
  },
  textCenter: {
    textAlign: 'center',
  },
  qrSquare: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export const ContainerStyle = styled.View`
  background-color: ${Colors.main};
  flex: 1;
  gap: 18px;
`;

export const QRContentStyle = styled.View`
  flex: 1;
  gap: 12px;
  justify-content: center;
  align-items: center;

  padding: 24px;
`;

export const InnerQRContentStyle = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  gap: 18px;
  padding: 32px;
`;

export const TestView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px;
`;

export const InnerQRTitleStyle = styled.View`
  gap: 8px;
  align-items: center;
`;
