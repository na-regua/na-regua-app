import React, {useContext, useMemo} from 'react';
import {CalendarContext} from '../../Calendar';
import {CalendarDaysWrapper} from '../../utils';
import {
  CalendarTitle,
  CalendarTitleProps,
} from '../CalendarTitle/CalendarTitle';
import {
  HorizontalDayPicker,
  HorizontalDayPickerProps,
} from '../HorizontalDayPicker/HorizontalDayPicker';
import {SelectDay} from '../SelectDay/SelectDay';
import {SelectMonth} from '../SelectMonth/SelectMonth';
import {SelectYear} from '../SelectYear/SelectYear';
import {WeekDays} from '../WeekDays/WeekDays';
import {CalendarContainerStyled, CalendarHeaderStyled} from './styles';
import {
  CalendarActions,
  CalendarActionsProps,
} from '../CalendarActions/CalendarActions';

export interface CalendarProps {
  showActions?: boolean;
  horizontalPickerProps?: HorizontalDayPickerProps;
  titleProps?: CalendarTitleProps;
  actionsProps?: CalendarActionsProps;
}

const CalendarBuilder: React.FC<CalendarProps> = ({
  horizontalPickerProps,
  titleProps,
  showActions,
  actionsProps,
}) => {
  const {viewMode} = useContext(CalendarContext);

  const showWeekDays = useMemo(
    () =>
      viewMode === 'SelectDay' ||
      viewMode === 'SelectMonth' ||
      viewMode === 'SelectYear',
    [viewMode],
  );

  return (
    <CalendarContainerStyled>
      <CalendarHeaderStyled showActions={showActions}>
        <CalendarTitle {...titleProps} />
        {showActions && <CalendarActions {...actionsProps} />}
      </CalendarHeaderStyled>
      {viewMode === 'HorizontalDayPicker' && horizontalPickerProps && (
        <HorizontalDayPicker {...horizontalPickerProps} />
      )}
      {showWeekDays && (
        <>
          {viewMode === 'SelectMonth' && <SelectMonth />}
          {viewMode === 'SelectYear' && <SelectYear />}
          <CalendarDaysWrapper>
            <WeekDays />
            <SelectDay />
          </CalendarDaysWrapper>
        </>
      )}
    </CalendarContainerStyled>
  );
};

export {CalendarBuilder};
