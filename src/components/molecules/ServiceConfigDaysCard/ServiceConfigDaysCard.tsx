import React, {useState} from 'react';

import {
  IBarberCreateSchedule,
  IBarberServiceDayConfig,
  TWorkTime,
} from '@/app/models';
import {
  SelectActiveSchedules,
  SelectSchedulesByDay,
  SelectWorkTime,
} from '@/components/atoms';
import {ConfigCardStyle} from './styles';

interface IServiceConfigDaysCardProps {
  config: IBarberServiceDayConfig;
  onChange: (config: IBarberServiceDayConfig) => void;
}

const ServiceConfigDaysCard: React.FC<IServiceConfigDaysCardProps> = ({
  config,
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
    onChange({...config, workTime: newWorkTime});
  };

  const handleOnSchedulesByDayChange = (newSchedulesByDay: number) => {
    setSchedulesByDay(newSchedulesByDay);
    onChange({...config, schedulesByDay: newSchedulesByDay});
  };

  const handleOnSchedulesChange = (newSchedules: IBarberCreateSchedule[]) => {
    setSchedules(newSchedules);
    onChange({...config, schedules: newSchedules});
  };

  return (
    <ConfigCardStyle>
      <SelectWorkTime workTime={workTime} onChange={handleOnChangeWorkTime} />
      <SelectSchedulesByDay
        schedulesByDay={schedulesByDay}
        onChange={handleOnSchedulesByDayChange}
      />
      <SelectActiveSchedules
        workTime={workTime}
        schedulesByDay={schedulesByDay}
        schedules={schedules}
        onChange={handleOnSchedulesChange}
      />
    </ConfigCardStyle>
  );
};

export default ServiceConfigDaysCard;
