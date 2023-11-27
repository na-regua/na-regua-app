import {Colors} from '@/theme';
import styled from 'styled-components/native';
import Typography, {ITypographyProps} from '../Typography/Typography';
import React from 'react';
import Icons, {IIconProps} from '../Icons/Icons';

export const ContainerStyle = styled.View`
  gap: 8px;
`;

export const ContentWrapperStyle = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

export const HeaderStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PlusIconStyle = styled<React.FC<IIconProps>>(Icons.PlusIcon)``;

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

  ${({recommended}) => recommended && `border: 1px solid ${Colors.main};`}

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
  ${({recommended}) => recommended && `color: ${Colors.main};`}
`;
