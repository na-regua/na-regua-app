import {Colors, Metrics} from '@/theme';
import {TColorsType} from '@/theme/colors';
import styled, {css} from 'styled-components/native';

export const CHContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.bgLight};
`;

export const CHContentStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: Metrics.unitX3,
    padding: Metrics.unitX3,
    flexGrow: 1,
  },
})`
  flex: 1;
`;

const BigActionRowCSS = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

const BigActionColumnCSS = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

export const BigActionStyled = styled.TouchableHighlight<{
  backgroundColor: TColorsType;
  direction: 'row' | 'column';
}>`
  border-radius: 18px;
  padding: 18px;
  padding-bottom: 0;
  background: ${({backgroundColor}) => Colors[backgroundColor]};
  ${({direction}) => direction === 'row' && BigActionRowCSS}
  ${({direction}) => direction === 'column' && BigActionColumnCSS}
`;

export const BigActionTextStyled = styled.View`
  padding-bottom: 18px;
  flex: 1;
  gap: 2px;
`;

export const LineStyled = styled.View`
  width: 100%;
  background-color: ${Colors.border};
  height: 1px;
`;

export const ShareQrButtonContentStyled = styled.View`
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CHTabsStyled = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 12px;
`;
