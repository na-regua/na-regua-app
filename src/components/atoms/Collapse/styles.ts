import {Colors} from '@/theme';
import styled from 'styled-components/native';
import ChevronUpIcon from '../Icons/ChevronUpIcon/ChevronUpIcon';
import {hexPercentage} from '@/theme/colors';
import {ChevronDownIcon} from '../Icons/ChevronDownIcon/ChevronDownIcon';

export const CollapseStyle = styled.View`
  border: 1px solid ${Colors.border};
  border-radius: 8px;

  padding: 12px;
  gap: 12px;
`;

export const HeaderStyle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UpIconStyled = styled(ChevronUpIcon).attrs({
  wrapperStyle: {
    borderRadius: 6,
    backgroundColor: Colors.default + hexPercentage[20],
  },
})``;

export const DownIconStyled = styled(ChevronDownIcon).attrs({
  wrapperStyle: {
    borderRadius: 6,
    backgroundColor: Colors.default + hexPercentage[20],
  },
})``;
