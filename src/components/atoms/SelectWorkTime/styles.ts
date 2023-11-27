import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const WorkTimeContainerStyle = styled.View`
  gap: 8px;
`;

export const SelectTimeContainerStyle = styled.View`
  gap: 16px;
  flex-direction: row;
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
    margin-right: -1px;
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
