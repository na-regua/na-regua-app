import {BOTTOM_NAV_HEIGHT} from '@/navigation/BottomNav/styles';
import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ScrollContentStyle = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: Metrics.smPadding,
    gap: Metrics.smPadding,
  },
})`
  flex: 1;
  margin-bottom: ${`${BOTTOM_NAV_HEIGHT}px`};
  padding-top: ${Metrics.unitX3}px;
`;

export const CustomerProfileStyled = styled.View`
  gap: 8px;
  justify-content: center;
  align-items: center;
`;
