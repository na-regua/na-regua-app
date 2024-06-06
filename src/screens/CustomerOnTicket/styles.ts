import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const OnTicketContainerStyled = styled.View`
  flex: 1;
  background: ${Colors.border};
`;

export const OnTicketContentStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: Metrics.unitX3,
    paddingTop: 0,
  },
})`
  flex: 1;
`;
export const OnTicketCardStyled = styled.View`
  background: ${Colors.bgLight};
  border-radius: 24px;
  align-self: stretch;
`;

export const OnTicketCardGroupStyled = styled.View`
  padding: 18px;
  padding-bottom: 0;
  width: 100%;
  align-self: stretch;
`;

export const OnTicketActionsStyled = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

export const OnTicketBarberInfoStyled = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const OnTicketBarberImageStyled = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 48px;
  height: 48px;
  border-radius: 12px;
`;

export const LineStyled = styled.View`
  width: 100%;
  background-color: ${Colors.border};
  height: 1px;
`;

export const OnTicketLineStyled = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: relative;
  margin: 18px 0;
`;

export const OnTicketLineStrokeStyled = styled.View`
  background-color: ${Colors.border};
  height: 1px;
  flex: 1;
`;

export const OnTicketLineCornerStyled = styled.View<{
  left?: boolean;
  right?: boolean;
}>`
  background-color: ${Colors.border};
  height: 24px;
  width: 16px;

  ${({left}) =>
    left &&
    `
    position: absolute;
    left: 0;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  `}
  ${({right}) =>
    right &&
    `
    position: absolute;
    right: 0;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  `}
`;

export const OnTicketInfoStyled = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const OnTicketIconWrapperStyled = styled.View`
  align-items: center;
  justify-content: center;
  background: ${Colors.secondary};
  width: 42px;
  height: 42px;
  border-radius: 12px;
`;
