import React, {useContext} from 'react';

import {Typography} from '@/components/atoms';
import {getYear} from 'date-fns';
import {CalendarContext} from '../../Calendar';
import {getDayWithO, getMonthName} from '../../utils/dateTo';
import {
  CalendarTitleTouchableStyled,
  CalendarTitleWrapperStyled,
} from './styles';

export type CalendarTitleType = 'SelectDay' | 'SelectMonth' | 'SelectYear';

export interface CalendarTitleProps {
  show?: Array<'day' | 'month' | 'year'>;
  disable?: Array<'day' | 'month' | 'year'>;
}

const CalendarTitle: React.FC<CalendarTitleProps> = ({
  show = ['day', 'month', 'year'],
  disable,
}) => {
  const {selectedDate, updateViewMode, viewMode, resetToInitialViewMode} =
    useContext(CalendarContext);

  const onTitlePress = (mode: 'SelectDay' | 'SelectMonth' | 'SelectYear') => {
    if (viewMode === mode) {
      resetToInitialViewMode();

      return;
    }

    updateViewMode(mode);
  };

  return (
    <CalendarTitleWrapperStyled>
      {show.includes('day') && (
        <CalendarTitleTouchableStyled
          activeOpacity={0.8}
          disabled={disable?.includes('day')}
          onPress={() => onTitlePress('SelectDay')}>
          <Typography
            variant={viewMode === 'SelectDay' ? 'h5' : 'h6'}
            color={
              viewMode === 'SelectDay'
                ? 'primary'
                : disable?.includes('day')
                ? 'disabled'
                : 'black2'
            }>
            {getDayWithO(selectedDate)}
          </Typography>
        </CalendarTitleTouchableStyled>
      )}
      {show.includes('month') && (
        <CalendarTitleTouchableStyled
          activeOpacity={0.8}
          disabled={disable?.includes('month')}
          onPress={() => onTitlePress('SelectMonth')}>
          <Typography
            variant={viewMode === 'SelectMonth' ? 'h5' : 'h6'}
            color={
              viewMode === 'SelectMonth'
                ? 'primary'
                : disable?.includes('month')
                ? 'disabled'
                : 'black2'
            }>
            {getMonthName(selectedDate)}
          </Typography>
        </CalendarTitleTouchableStyled>
      )}
      {show.includes('year') && (
        <CalendarTitleTouchableStyled
          activeOpacity={0.8}
          disabled={disable?.includes('year')}
          onPress={() => onTitlePress('SelectYear')}>
          <Typography
            variant={viewMode === 'SelectYear' ? 'h5' : 'h6'}
            color={
              viewMode === 'SelectYear'
                ? 'primary'
                : disable?.includes('year')
                ? 'disabled'
                : 'black2'
            }>
            {getYear(selectedDate)}
          </Typography>
        </CalendarTitleTouchableStyled>
      )}
    </CalendarTitleWrapperStyled>
  );
};

export {CalendarTitle};
