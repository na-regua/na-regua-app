import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

export function getNextDaysFromLimit(startDate: Date, limit: number): Date[] {
  const days = [];

  for (let i = 0; i < limit; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + i);
    days.push(newDate);
  }

  return days;
}

export const getDayWithO = (date: Date): string => {
  const day = date.getDate();
  return day < 10 ? `0${day}` : `${day}`;
};

export const getDayName = (date: Date): string => {
  const formattedDay = format(date, 'EEE', {locale: ptBR}).slice(0, 3);
  return formattedDay.charAt(0).toLocaleUpperCase() + formattedDay.slice(1);
};

export const compareDays = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const getMonthName = (date: Date): string => {
  const formattedDate = format(date, 'MMMM', {locale: ptBR});

  return formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);
};

export function generateCalendar(selectedDate: Date, dayRowSize: number) {
  const calendar = [];
  // Find the first sunday from the selected date month
  const firstDay = new Date(selectedDate);
  firstDay.setDate(1);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());

  const currentDate = firstDay;

  //Check if date is on the calendar range
  const daysRange = (dayRowSize - 1) * 7;

  const limitDay = new Date(currentDate);
  limitDay.setDate(currentDate.getDate() + daysRange);

  const isOnRange = limitDay > new Date(selectedDate);

  if (!isOnRange) {
    currentDate.setDate(currentDate.getDate() + 7);
  }

  // Continue adding weeks until we've filled the required rows
  for (let i = 0; i < dayRowSize; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendar.push(week);
  }

  return calendar;
}

export function getNextYears(initialYear: number, limit: number): number[] {
  return Array.from({length: limit}, (_, i) => initialYear + i);
}
