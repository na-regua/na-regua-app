import React, {useEffect, useMemo, useState} from 'react';

import {
  IBarberCreateSchedule,
  IBarberServiceDayConfig,
  TWorkTime,
} from '@/app/models';
import {
  Collapse,
  SelectActiveSchedules,
  SelectSchedulesByDay,
  SelectWorkTime,
} from '@/components/atoms';

interface IServiceConfigDaysCardProps {
  title?: string;
  subtitle?: string;
  config: IBarberServiceDayConfig;
  onChange: (config: IBarberServiceDayConfig, changed: boolean) => void;
}

const ServiceConfigDaysCard: React.FC<IServiceConfigDaysCardProps> = ({
  config,
  title,
  subtitle,
  onChange,
}) => {
  const [workTime, setWorkTime] = useState<TWorkTime>(config.workTime);
  const [schedulesByDay, setSchedulesByDay] = useState<number>(
    config.schedulesByDay,
  );
  const [schedules, setSchedules] = useState<IBarberCreateSchedule[]>(
    config.schedules,
  );

  const handleOnChangeWorkTime = (newWorkTime: TWorkTime) => {
    setWorkTime(newWorkTime);
  };

  const handleOnSchedulesByDayChange = (newSchedulesByDay: number) => {
    setSchedulesByDay(newSchedulesByDay);
  };

  const handleOnSchedulesChange = (newSchedules: IBarberCreateSchedule[]) => {
    setSchedules(newSchedules);
  };

  const hasChanges = useMemo(() => {
    const changedWorkTime =
      workTime.end !== config.workTime.end ||
      workTime.start !== config.workTime.start;

    const changedSchedulesByDay = schedulesByDay !== config.schedulesByDay;

    const [bigger, smaller] =
      schedules.length > config.schedules.length
        ? [schedules, config.schedules]
        : [config.schedules, schedules];

    const changedActiveSchedules = bigger
      .map(day => smaller.includes(day))
      .some(item => !item);

    return changedWorkTime || changedSchedulesByDay || changedActiveSchedules;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workTime, schedulesByDay, schedules]);

  useEffect(() => {
    onChange({...config, workTime, schedulesByDay, schedules}, hasChanges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workTime, schedulesByDay, schedules]);

  return (
    <Collapse title={title} subtitle={subtitle}>
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
