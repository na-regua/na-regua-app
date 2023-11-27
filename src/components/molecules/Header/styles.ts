import {Colors, Fonts, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  containerInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInfoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  containerInfoIcon: {
    borderRadius: 8,
    width: 32,
    height: 32,
    backgroundColor: Colors.main,
  },
  title: {
    flexDirection: 'column',
    gap: 4,
    paddingTop: Metrics.smPadding,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.border,
    width: Metrics.screenWidth,
    height: 1,
  },
  welcomeText: {
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
  },
});

export const ContainerStyle = styled.View`
  flex-direction: column;
  padding: ${Metrics.smPadding}px;
  width: ${Metrics.screenWidth}px;
  position: relative;
`;

export const ContainerInfoStyle = styled.View<{lightContent?: boolean}>`
  border-radius: 8px;
  width: 32px;
  height: 32px;
  background-color: ${({lightContent}) =>
    lightContent ? Colors.white3 : Colors.main};
  justify-content: center;
  align-items: center;
`;
