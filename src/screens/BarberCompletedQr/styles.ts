import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  textAlignCenter: {
    textAlign: 'center',
  },
  flexGrow1: {
    flexGrow: 1,
  },
  viewShot: {
    flexGrow: 1,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrWrapper: {
    marginVertical: 18,
  },
});

export const ContainerStyle = styled.ScrollView`
  background-color: ${Colors.main};
  flex: 1;
`;

export const ContentStyle = styled.View`
  flex: 1;
  padding: ${Metrics.smPadding}px;
`;

export const QRContentStyle = styled.View`
  flex: 1;
  gap: 18px;
  justify-content: center;
  align-items: center;
`;

export const ActionsStyle = styled.View`
  gap: ${Metrics.smPadding}px;
`;
