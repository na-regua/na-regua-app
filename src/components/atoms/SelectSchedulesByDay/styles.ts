import {Colors} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Icons, {IIconProps} from '../Icons/Icons';

export const styles = StyleSheet.create({
  iconWrapper: {
    padding: 4,
    backgroundColor: Colors.border,
  },
  iconWrapperRight: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  iconWrapperLeft: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export const MinusIconStyle = styled<React.FC<IIconProps>>(Icons.MinusIcon)`
  padding: 4px;
  background-color: ${Colors.main};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;

  ${({disabled}) =>
    disabled &&
    `
    background-color: ${Colors.disabled};
  `}
`;

export const PlusIconStyle = styled<React.FC<IIconProps>>(Icons.PlusIcon)`
  padding: 4px;
  background-color: ${Colors.main};
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;

export const ContainerStyle = styled.View`
  gap: 8px;
`;

export const InputWrapperContainerStyle = styled.View`
  flex-direction: row;
  width: auto;
`;

export const InputTextWrapperStyle = styled.View`
  padding: 4px 12px;
  border: 1px solid ${Colors.border};
  border-left-width: none;
  border-right-width: none;
`;

export const SelectTimeScrollStyle = styled.ScrollView``;

export const SelectTimeWrapperStyle = styled.View`
  flex-direction: row;
`;
