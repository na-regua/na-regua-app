import React, {createContext, useState} from 'react';
import {CalendarBuilder} from './components';
import {
  CalendarContextData,
  CalendarProviderProps,
  CalendarSelectDayMode,
  CalendarViewModeType,
} from './models/context';

export const CalendarContext = createContext<CalendarContextData>(
  {} as CalendarContextData,
);

export const Calendar: React.FC<CalendarProviderProps> = ({
  initialSelectedDate = new Date(),
  initialSelectDayMode = 'single',
  initialViewMode = 'HorizontalDayPicker',
  onSelectedDateChange,
  markedDates,
  showMarker,
  daysRows = 5,
  disableDates,
  horizontalPickerProps,
  showActions,
  titleProps,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [viewMode, setViewMode] =
    useState<CalendarViewModeType>(initialViewMode);
  const [selectDayMode, setSelectDayMode] =
    useState<CalendarSelectDayMode>(initialSelectDayMode);

  const updateSelectedDate = (date: Date) => {
    setSelectedDate(date);

    if (onSelectedDateChange) {
      onSelectedDateChange(date);
    }
  };

  const updateViewMode = (mode: CalendarViewModeType) => {
    setViewMode(mode);
  };

  const updateSelectDayMode = (mode: CalendarSelectDayMode) => {
    setSelectDayMode(mode);
  };

  const resetToInitialViewMode = () => {
    setViewMode(initialViewMode);
  };

  const isDisabledDate = (date: Date) => {
    if (disableDates) {
      return disableDates(date, {
        horizontalStartDate: horizontalPickerProps?.initialDate,
        selectedDate,
      });
    }

    return false;
  };

  return (
    <CalendarContext.Provider
      value={{
        initialSelectedDate,
        selectedDate,
        updateSelectedDate,
        selectDayMode,
        viewMode,
        updateSelectDayMode,
        updateViewMode,
        resetToInitialViewMode,
        markedDates,
        showMarker,
        daysRows,
        isDisabledDate,
      }}>
      <CalendarBuilder
        horizontalPickerProps={horizontalPickerProps}
        showActions={showActions}
        titleProps={titleProps}
      />
    </CalendarContext.Provider>
  );
};
