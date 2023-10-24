import {Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrollContainer: {
    gap: Metrics.smPadding,
  },
  flex1: {
    flex: 1,
  },
});

export const ScrollViewStyle = styled.ScrollView`
  flex-grow: 1;
`;

export const AvatarWrapperStyle = styled.View`
  align-items: center;
  justify-content: center;
`;
