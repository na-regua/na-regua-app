import {Typography} from '@/components/atoms';
import {Colors, Fonts, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({});

export const ContainerStyle = styled.View`
  flex-direction: column;
  padding: 12px 18px;
  width: ${Metrics.screenWidth}px;
  position: relative;
`;

export const LogoContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const TitleContainerStyle = styled.View`
  flex-direction: row;
`;

export const LogoIconStyle = styled.TouchableOpacity<{lightContent?: boolean}>`
  border-radius: 6px;
  width: 32px;
  height: 32px;
  background-color: ${({lightContent}) =>
    lightContent ? Colors.white3 : Colors.main};
  justify-content: center;
  align-items: center;
`;

export const BorderContainerStyle = styled.View`
  position: absolute;
  bottom: 0;
  background-color: ${Colors.border};
  width: ${Metrics.screenWidth}px;
  height: 1px;
`;

export const BackContainerStyle = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const UserClickContainerStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  align-items: center;
  justify-content: center;
`;

export const UserImageStyle = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 50px;
`;

export const WelcomeTextStyle = styled(Typography)`
  font-weight: ${Fonts.weights.medium};
  font-family: ${Fonts.types.medium};
`;
