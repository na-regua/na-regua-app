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
});

export const ContainerStyle = styled.View`
  background-color: ${Colors.main};
  flex: 1;
  gap: 18px;
`;

export const QRContentStyle = styled.View`
  flex: 1;
  gap: 18px;
  justify-content: center;
  align-items: center;
`;
