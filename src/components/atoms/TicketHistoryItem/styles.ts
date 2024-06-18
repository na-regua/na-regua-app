import {Colors} from '@/theme';
import {TColorsType} from '@/theme';
import styled from 'styled-components/native';
import {AnimatedTouchableOpacity} from '../AnimatedComponents';
import {TICKET_HISTORY_ITEM_HEIGHT} from './TicketHistoryItem';

export const THITouchableContainer = styled(AnimatedTouchableOpacity)<{
  backgroundColor?: TColorsType;
  backgroundHoverColor?: TColorsType;
  selected?: boolean;
  _zIndex?: number;
}>`
  min-height: ${TICKET_HISTORY_ITEM_HEIGHT}px;
  padding: 12px;
  border-radius: 18px;
  background-color: ${({backgroundColor}) =>
    backgroundColor && Colors[backgroundColor]};
  align-self: stretch;
  gap: 6px;
  width: 100%;
  position: relative;
  z-index: ${({_zIndex}) => _zIndex};

  ${({selected}) =>
    !selected &&
    `
    justify-content: space-between;
  `}

  ${({backgroundHoverColor, selected}) =>
    selected &&
    `
    background-color: ${backgroundHoverColor && Colors[backgroundHoverColor]};
    margin: 12px 0;
    gap: 12px;
  `};
`;
