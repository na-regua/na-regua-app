import {Typography} from '@/components/atoms';
import {Colors, Metrics} from '@/theme';
import {CachedImage} from '@georstat/react-native-image-cache';
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
  width: 100%;
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
  justify-content: flex-start;
  gap: 4px;
  padding-top: 8px;
  padding-bottom: 4px;
`;

export const UserClickContainerStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const UserImageStyle = styled(CachedImage).attrs({
  resizeMode: 'cover',
  imageStyle: {
    borderRadius: 21,
  },
})`
  width: 42px;
  height: 42px;
`;

export const WelcomeTextStyle = styled(Typography)``;
