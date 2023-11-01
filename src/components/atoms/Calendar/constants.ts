export type TWeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export const WEEK_DAYS: TWeekDay[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export const WEEK_DAY_TO_PT_BR: Record<TWeekDay, string> = {
  sun: 'Domingo',
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
};

export const DAY_TIMES: string[] = Array.from(Array(48).keys()).map(value => {
  const by2 = Math.floor(value / 2);
  const hasRest = value % 2 !== 0;

  return `${by2 < 10 ? '0' + by2 : by2}:${hasRest ? '30' : '00'}`;
});

export const SCHEDULE_DEFAULT_TIMES: {label: string; value: number}[] = [
  {
    label: 'scheduleLimits.week',
    value: 7,
  },
  {
    label: 'scheduleLimits.twoWeeks',
    value: 14,
  },
  {
    label: 'scheduleLimits.month',
    value: 30,
  },
];
