import {CalendarContext, Typography} from '@/components/atoms';
import {format} from 'date-fns';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {WEEK_DAYS} from '../../models/constants';
import {CalendarRowItemStyled, CalendarRowStyled} from '../../utils';

const WeekDays = () => {
  const {t} = useTranslation();
  const {selectedDate} = useContext(CalendarContext);

  const isActive = (day: string) => {
    return (
      format(selectedDate, 'eee').toLocaleLowerCase() ===
      day.toLocaleLowerCase()
    );
  };

  return (
    <CalendarRowStyled style={{paddingBottom: 8}}>
      {WEEK_DAYS.map((day, index) => (
        <CalendarRowItemStyled key={index} disabled>
          <Typography
            variant={isActive(day) ? 'body1' : 'body2'}
            color={isActive(day) ? 'primary' : 'default'}>
            {t(`calendar.weekDays.single.${day}`)}
          </Typography>
        </CalendarRowItemStyled>
      ))}
    </CalendarRowStyled>
  );
};

export {WeekDays};
