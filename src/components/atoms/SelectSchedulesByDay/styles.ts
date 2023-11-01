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
  background-color: ${Colors.border};
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
  background-color: ${Colors.border};
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
  border-left: none;
  border-right: none;
`;

export const SelectTimeScrollStyle = styled.ScrollView``;

export const SelectTimeWrapperStyle = styled.View`
  flex-direction: row;
`;

export const SelectTimeButton = styled.TouchableOpacity<{
  active?: boolean;
  selectedStart?: boolean;
  selectedEnd?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  activeColor?: string;
}>`
  padding: 4px 8px;

  ${({active, activeColor}) =>
    active &&
    activeColor &&
    `
    background-color: ${activeColor}66;
  `}

  ${({isStart}) =>
    isStart &&
    `
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  `}

${({isEnd}) =>
    isEnd &&
    `
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  `}

${({isStart, selectedStart}) =>
    isStart &&
    selectedStart &&
    `
    background-color: ${Colors.warning};
  `}

${({isEnd, selectedEnd}) =>
    isEnd &&
    selectedEnd &&
    `
    background-color: ${Colors.main};
  `}
`;
