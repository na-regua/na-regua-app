import {Typography} from '@/components/atoms';
import {format} from 'date-fns';
import React, {useContext, useMemo} from 'react';
import {CalendarContext} from '../../Calendar';
import {
  CalendarRowItemDot,
  CalendarRowItemStyled,
  CalendarRowStyled,
  compareDays,
  generateCalendar,
} from '../../utils';
import {TColorsType} from '@/theme/colors';

const SelectDay: React.FC = () => {
  const {
    selectedDate,
    daysRows,
    viewMode,
    updateSelectedDate,
    showMarker,
    markedDates,
    isDisabledDate,
  } = useContext(CalendarContext);

  const selectYearOrMonth = useMemo(
    () => viewMode === 'SelectMonth' || viewMode === 'SelectYear',
    [viewMode],
  );

  const daysRowsShowed = useMemo(() => {
    return selectYearOrMonth ? daysRows - 1 : daysRows;
  }, [daysRows, selectYearOrMonth]);

  const calendar: Date[][] = useMemo(
    () => generateCalendar(selectedDate, daysRowsShowed),
    [selectedDate, daysRowsShowed],
  );

  const sameMonth = (day: Date) => day.getMonth() === selectedDate.getMonth();

  const isMarked = (day: Date) => {
    if (showMarker && markedDates && markedDates.length > 0) {
      return markedDates.some(date => compareDays(day, date));
    }

    return false;
  };

  const getDayColor = (day: Date): TColorsType => {
    if (isDisabledDate(day)) {
      return 'disabled';
    }

    if (!sameMonth(day)) {
      return 'black1';
    }

    if (compareDays(day, selectedDate)) {
      return 'white3';
    }

    return 'black3';
  };

  return calendar.map((week, weekIndex) => (
    <CalendarRowStyled key={weekIndex}>
      {week.map((day, weekDayIndex) => (
        <CalendarRowItemStyled
          activeOpacity={0.6}
          key={weekDayIndex}
          isActive={compareDays(day, selectedDate)}
          showMarker={showMarker}
          onPress={() => updateSelectedDate(day)}
          disabled={isDisabledDate(day)}>
          <Typography variant="body1" color={getDayColor(day)}>
            {format(day, 'dd')}
          </Typography>
          {showMarker && (
            <CalendarRowItemDot
              isActive={compareDays(day, selectedDate)}
              isMarked={isMarked(day)}
            />
          )}
        </CalendarRowItemStyled>
      ))}
    </CalendarRowStyled>
  ));
};

export {SelectDay};
