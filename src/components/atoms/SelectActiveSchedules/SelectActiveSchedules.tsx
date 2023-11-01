import {IBarberCreateSchedule, TWorkTime} from '@/app/models';
import {generateRecommendedTime} from '@/utils';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Typography from '../Typography/Typography';
import {
  ContainerStyle,
  ContentWrapperStyle,
  SelectScheduleTimeLabelStyle,
  SelectScheduleTimeStyle,
} from './styles';

interface ISelectActiveSchedulesProps {
  schedulesByDay: number;
  workTime: TWorkTime;
  schedules: IBarberCreateSchedule[];
  onChange: (workTime: IBarberCreateSchedule[]) => void;
}

const SelectActiveSchedules: React.FC<ISelectActiveSchedulesProps> = ({
  schedules,
  schedulesByDay,
  workTime,
  onChange,
}) => {
  const {t} = useTranslation();
  const [allSchedules, setAllSchedules] = useState<IBarberCreateSchedule[]>([]);

  const [deleteSchedulesSet, setDeleteSchedulesSet] = useState<string[]>([]);

  const generateRecommendedSchedules = useCallback(() => {
    const newSchedules = generateRecommendedTime(
      schedules,
      schedulesByDay,
      workTime,
    );

    setAllSchedules(newSchedules);

    console.log(workTime, schedulesByDay, newSchedules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules, schedulesByDay, workTime]);

  const addToDeleteSet = (schedule: IBarberCreateSchedule) => {
    setDeleteSchedulesSet(prev => [...prev, schedule.time]);
  };

  const selectSchedule = (schedule: IBarberCreateSchedule) => {
    const newSchedules: IBarberCreateSchedule[] = [
      ...schedules,
      {
        time: schedule.time,
        active: true,
        recommended: false,
      },
    ];

    onChange(newSchedules);
  };

  const deleteSchedule = (schedule: IBarberCreateSchedule) => {
    const newSchedules = schedules.filter(
      item =>
        item.time !== schedule.time && !deleteSchedulesSet.includes(item.time),
    );

    setDeleteSchedulesSet(prev => prev.filter(item => item !== schedule.time));

    onChange(newSchedules);
  };

  const handleSelectSchedule = (schedule: IBarberCreateSchedule) => {
    if (deleteSchedulesSet.includes(schedule.time)) {
      deleteSchedule(schedule);

      return;
    }

    if (schedule.active) {
      addToDeleteSet(schedule);
    } else {
      selectSchedule(schedule);
    }
  };

  useEffect(() => {
    generateRecommendedSchedules();
  }, [generateRecommendedSchedules]);

  return (
    <ContainerStyle>
      <Typography variant="caption" color="placeholder">
        {t('barber.servicesConfig.fields.workTime')}
      </Typography>
      <ContentWrapperStyle>
        {allSchedules.map((schedule, index) => (
          <SelectScheduleTimeStyle
            key={index}
            active={schedule.active}
            recommended={schedule.recommended}
            activeOpacity={0.8}
            onPress={() => handleSelectSchedule(schedule)}
            isOnDelete={deleteSchedulesSet.includes(schedule.time)}>
            <SelectScheduleTimeLabelStyle
              variant="button"
              active={schedule.active}
              recommended={schedule.recommended}>
              {schedule.time}
            </SelectScheduleTimeLabelStyle>
          </SelectScheduleTimeStyle>
        ))}
      </ContentWrapperStyle>
    </ContainerStyle>
  );
};

export default SelectActiveSchedules;
