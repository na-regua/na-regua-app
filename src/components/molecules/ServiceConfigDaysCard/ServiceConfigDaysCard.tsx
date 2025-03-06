import React, {useEffect, useMemo, useState} from 'react';

import {IBarberServiceDaysConfig, TWorkTime} from '@/app/models';
import {
  Collapse,
  SelectActiveSchedules,
  SelectSchedulesByDay,
  SelectWorkTime,
} from '@/components/atoms';

interface IServiceConfigDaysCardProps {
  config: IBarberServiceDaysConfig;
  onChange: (
    config: Partial<IBarberServiceDaysConfig>,
    changed: boolean,
  ) => void;
}

const ServiceConfigDaysCard: React.FC<IServiceConfigDaysCardProps> = ({
  config,
  onChange,
}) => {
  const [workTime, setWorkTime] = useState<TWorkTime>(config.work_time);
  const [schedulesByDay, setSchedulesByDay] = useState<number>(
    config.schedules_by_day,
  );
  const [schedules, setSchedules] = useState<string[]>(config.schedule_times);

  const handleOnChangeWorkTime = (newWorkTime: TWorkTime) => {
    setWorkTime(newWorkTime);
  };

  const handleOnSchedulesByDayChange = (newSchedulesByDay: number) => {
    setSchedulesByDay(newSchedulesByDay);
  };

  const handleOnSchedulesChange = (newSchedules: string[]) => {
    setSchedules(newSchedules);
  };

  const hasChanges = useMemo(() => {
    const changedWorkTime =
      workTime.end !== config.work_time.end ||
      workTime.start !== config.work_time.start;

    const changedSchedulesByDay = schedulesByDay !== config.schedules_by_day;

    const [bigger, smaller] =
      schedules.length > config.schedule_times.length
        ? [schedules, config.schedule_times]
        : [config.schedule_times, schedules];

    const changedActiveSchedules = bigger
      .map(day => smaller.includes(day))
      .some(item => !item);

    return changedWorkTime || changedSchedulesByDay || changedActiveSchedules;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workTime, schedulesByDay, schedules]);

  useEffect(() => {
    onChange(
      {
        work_time: workTime,
        schedules_by_day: schedulesByDay,
        schedule_times: schedules,
      },
      hasChanges,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workTime, schedulesByDay, schedules]);

  return (
    <Collapse
      title="barber.servicesConfig.sections.schedule.title"
      subtitle="barber.servicesConfig.sections.schedule.subtitle">
      <SelectWorkTime workTime={workTime} onChange={handleOnChangeWorkTime} />
      <SelectSchedulesByDay
        schedulesLength={schedules.length}
        schedulesByDay={schedulesByDay}
        onChange={handleOnSchedulesByDayChange}
      />
      <SelectActiveSchedules
        workTime={workTime}
        schedulesByDay={schedulesByDay}
        schedules={schedules}
        onChange={handleOnSchedulesChange}
      />
    </Collapse>
  );
};

export default ServiceConfigDaysCard;
