import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const customerLoginStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export const ContainerStyle = styled.ScrollView`
  flex: 1;
  background: ${Colors.bgContrast};
  padding: 42px;
`;

export const ContentStyle = styled.View`
  flex-grow: 1;
  gap: ${Metrics.unitX4}px;
  padding-bottom: 0;
  justify-content: space-between;
  max-width: 360px;
  min-width: 240px;
  width: 100%;
`;

export const ContentFormStyle = styled.View`
  flex: 1;
  gap: ${Metrics.unitX3}px;
`;

export const LogoContainerStyle = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${Metrics.unitX4}px;
`;

export const FooterContainerStyle = styled.View`
  gap: ${Metrics.unitX4}px;
  justify-content: center;
  align-items: center;
`;
