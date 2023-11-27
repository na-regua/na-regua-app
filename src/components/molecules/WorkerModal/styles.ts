import {Button, IButtonProps} from '@/components/atoms';
import {Metrics} from '@/theme';
import {FC} from 'react';
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

export const ActionsContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Metrics.smPadding}px;
  flex: 1;
`;

export const ButtonStyle = styled<FC<IButtonProps>>(Button)`
  flex: 1;
`;
