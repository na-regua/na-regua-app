import {TWorkTime} from '@/app/models';

export function timeToNumber(time: string): number {
  const splittedTime = time.split(':');

  const hours = +splittedTime[0] * 100;
  const minutes = (+splittedTime[1] / 100) * 60;

  return Math.ceil(hours + minutes);
}

export function numberToTime(number: number): string {
  const hours = Math.floor(number / 100);
  const minutes = ((number % 100) / 100) * 60;
  const minutesStr =
    minutes < 10 ? `0${minutes.toFixed(0)}` : minutes.toFixed(0);

  return `${hours}:${minutesStr}`;
}

export function sortSchedulesByTime(arr: string[]): string[] {
  return arr.sort((a, b) => timeToNumber(a) - timeToNumber(b));
}
