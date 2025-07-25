import React, {useRef, useState} from 'react';

import {getDayToWorkDays} from '@/app/models';
import {Icons, Modal, Typography} from '@/components/atoms';
import {CutActions} from '@/store/slicers';
import {AppDispatch, RootState} from '@/store/Store';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import DateTimePicker, {getDefaultStyles} from 'react-native-ui-datepicker';
import {
  DateType,
  SingleChange,
} from 'react-native-ui-datepicker/lib/typescript/types';
import {useDispatch, useSelector} from 'react-redux';
import Styled, {datePickerStyles} from './styles';

const CustomerAttendanceSchedule: React.FC = () => {
  const defaultStyles = getDefaultStyles();

  const [scheduleTimes, setScheduleTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<DateType>();
  const {selectedBarber, availableSchedules} = useSelector(
    (state: RootState) => state.cut,
  );

  const dispatch = useDispatch<AppDispatch>();

  const today = new Date();
  const calendarModalRef = useRef<BottomSheetModal | null>(null);

  const showCalendarModal = () => {
    calendarModalRef.current?.present();
  };

  const onSelectDate: SingleChange = async ({date}) => {
    if (date && availableSchedules) {
      setSelectedDate(date);
      const dateTypeToDate = new Date(date.toString());

      const findSchedule = availableSchedules.find(({date: _sd}) => {
        const sd = new Date(_sd);

        return (
          sd.getDate() === dateTypeToDate.getDate() &&
          sd.getMonth() === dateTypeToDate.getMonth() &&
          sd.getFullYear() === dateTypeToDate.getFullYear()
        );
      });

      if (findSchedule) {
        setScheduleTimes(findSchedule.schedules);
      }
    }

    calendarModalRef.current?.dismiss();
  };

  const onSelectTime = (time: string) => {
    setSelectedTime(time);

    dispatch(CutActions.setScheduleConfig({date: selectedDate, time}));
  };

  const disabledDates = (date: DateType) => {
    if (date && selectedBarber) {
      const dayNumber = new Date(date.toString()).getDay();
      const dateAsWorkDay = getDayToWorkDays[dayNumber];
      const isOutOfWorkDay =
        !selectedBarber.config.work_days.includes(dateAsWorkDay);
      const limitDay = new Date(today);
      limitDay.setDate(
        limitDay.getDate() + selectedBarber.config.schedule_limit_days || 0,
      );
      const isFarThanBarberScheduleLimit = new Date(date.toString()) > limitDay;

      return isOutOfWorkDay || isFarThanBarberScheduleLimit;
    }

    return false;
  };

  return (
    <Styled.Container>
      <Styled.Field>
        <Typography variant="body1">
          {'customer.cut.attendance.types.day'}
        </Typography>
        <Styled.DatePicker onPress={showCalendarModal}>
          <Typography
            variant="button"
            color={selectedDate ? 'black3' : 'placeholder'}>
            {selectedDate && selectedDate?.toString()
              ? format(new Date(selectedDate.toString()), 'dd MMMM yyyy', {
                  locale: ptBR,
                })
              : 'customer.cut.attendance.select.day'}
          </Typography>
          <Icons.ScheduleIcon width={18} height={18} strokeWidth={2} />
        </Styled.DatePicker>
      </Styled.Field>
      {scheduleTimes.length > 0 && (
        <Styled.Field>
          <Typography variant="body1">
            {'customer.cut.attendance.select.time'}
          </Typography>
          <Styled.ScheduleItemWrapper>
            {scheduleTimes.map(time => (
              <Styled.ScheduleItem
                onPress={() => onSelectTime(time)}
                active={selectedTime === time}
                key={time}>
                <Typography
                  variant="button"
                  translate={false}
                  color={selectedTime === time ? 'white3' : 'black3'}>
                  {time}
                </Typography>
              </Styled.ScheduleItem>
            ))}
          </Styled.ScheduleItemWrapper>
        </Styled.Field>
      )}

      <Modal ref={calendarModalRef} height={420}>
        <DateTimePicker
          minDate={today}
          mode="single"
          date={selectedDate}
          onChange={onSelectDate}
          timeZone="America/Sao_Paulo"
          styles={{...defaultStyles, ...datePickerStyles}}
          locale="pt-BR"
          disabledDates={disabledDates}
          navigationPosition="right"
          disableYearPicker
          disableMonthPicker
        />
      </Modal>
    </Styled.Container>
  );
};

export {CustomerAttendanceSchedule};
