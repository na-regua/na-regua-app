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
`;

export const ContentStyle = styled.View`
  flex: 1;
  width: 100%;
  gap: ${Metrics.paddingX4}px;
  padding: 42px;
  padding-bottom: 24px;
  justify-content: space-between;
`;

export const ContentFormStyle = styled.View`
  flex: 1;
  gap: ${Metrics.paddingX3}px;
`;

export const LogoContainerStyle = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${Metrics.paddingX4}px;
`;

export const FooterContainerStyle = styled.View`
  gap: ${Metrics.paddingX4}px;
  justify-content: center;
  align-items: center;
`;
