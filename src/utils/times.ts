import {IBarberCreateSchedule, TWorkTime} from '@/app/models';

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

export function hasCloseActiveTime(
  time: number,
  activeSchedules: IBarberCreateSchedule[],
): boolean {
  const closeTime = activeSchedules.find(schedule => {
    const forward = timeToNumber(schedule.time) + 50;
    const fallback = timeToNumber(schedule.time) - 50;

    if (time >= fallback && time <= forward) {
      return schedule;
    }
  });

  return closeTime !== undefined;
}

export function generateRecommendedTime(
  allSchedules: IBarberCreateSchedule[],
  schedulesByDay: number,
  workTime: TWorkTime,
  withActiveSchedules = true,
): IBarberCreateSchedule[] {
  if (allSchedules.length === schedulesByDay) {
    return allSchedules;
  }

  const quantity = schedulesByDay;

  const activeSchedules = allSchedules.filter(schedule => schedule.active);

  const startToNumber = timeToNumber(workTime.start);
  const endToNumber = timeToNumber(workTime.end);

  if (endToNumber - startToNumber < 100) {
    return allSchedules;
  }

  const middleHour = (endToNumber - startToNumber) / 2;

  const lunchTime = 100;
  const lunchStart = startToNumber + middleHour - lunchTime;
  const lunchEnd = startToNumber + middleHour;

  const workHours = endToNumber - startToNumber - lunchTime;

  const interval = Math.ceil(workHours / quantity);

  const possibilities = [];

  for (
    let startCount = startToNumber;
    startCount < lunchStart;
    startCount += interval
  ) {
    if (!hasCloseActiveTime(startCount, activeSchedules)) {
      possibilities.push(startCount);
    }
  }

  for (let endCount = lunchEnd; endCount < endToNumber; endCount += interval) {
    if (!hasCloseActiveTime(endCount, activeSchedules)) {
      possibilities.push(endCount);
    }
  }

  const timePossibilities = possibilities.map(possibility =>
    numberToTime(possibility),
  );
  const mappedBarberSchedulesTime: IBarberCreateSchedule[] =
    timePossibilities.map(time => ({
      time,
      recommended: true,
    }));

  let allSchedulesTime = mappedBarberSchedulesTime;

  if (withActiveSchedules) {
    allSchedulesTime = [...mappedBarberSchedulesTime, ...activeSchedules].sort(
      (a, b) => timeToNumber(a.time) - timeToNumber(b.time),
    );
  }

  return allSchedulesTime;
}
