import {Colors} from '@/theme';
import styled from 'styled-components/native';
import Typography, {ITypographyProps} from '../Typography/Typography';
import React from 'react';

export const ContainerStyle = styled.View`
  gap: 8px;
`;

export const ContentWrapperStyle = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

export const SelectScheduleTimeStyle = styled.TouchableOpacity<{
  active?: boolean;
  recommended?: boolean;
  isOnDelete?: boolean;
}>`
  border-radius: 4px;
  padding: 4px 12px;

  ${({active}) =>
    active &&
    `
    background-color: ${Colors.main};
  `}

  ${({recommended}) => recommended && `background-color: ${Colors.border};`}

  ${({isOnDelete}) =>
    isOnDelete &&
    `
    background-color: ${Colors.danger};
  `}
`;

export const SelectScheduleTimeLabelStyle = styled<
  React.FC<ITypographyProps & {active?: boolean; recommended?: boolean}>
>(Typography)`
  ${({active}) => active && `color: ${Colors.white3};`}
  ${({recommended}) => recommended && `color: ${Colors.default};`}
`;
