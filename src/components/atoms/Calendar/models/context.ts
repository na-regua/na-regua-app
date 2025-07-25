import {CalendarProps} from '../components';

export type CalendarViewModeType =
  | 'HorizontalDayPicker'
  | 'SelectDay'
  | 'SelectYear'
  | 'SelectMonth';
export type CalendarSelectDayMode = 'single' | 'range';

export interface CalendarContextData {
  initialSelectedDate: Date;
  selectedDate: Date;
  viewMode: CalendarViewModeType;
  selectDayMode: CalendarSelectDayMode;

  markedDates?: Date[];
  showMarker?: boolean;
  daysRows: number;

  updateSelectedDate: (date: Date) => void;
  updateViewMode: (viewMode: CalendarViewModeType) => void;
  updateSelectDayMode: (selectDayMode: CalendarSelectDayMode) => void;

  isDisabledDate: (date: Date) => boolean;

  resetToInitialViewMode: () => void;
}

export interface CalendarProviderProps extends CalendarProps {
  initialSelectedDate?: Date;
  initialViewMode?: CalendarViewModeType;
  initialSelectDayMode?: CalendarSelectDayMode;
  showMarker?: boolean;
  markedDates?: Date[];
  daysRows?: number;
  disableDates?: (
    date: Date,
    opts?: {
      selectedDate?: Date;
      horizontalStartDate?: Date;
    },
  ) => boolean;
  onSelectedDateChange?: (date: Date) => void;
}
