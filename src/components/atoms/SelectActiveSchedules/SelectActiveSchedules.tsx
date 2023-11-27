import {IBarberCreateSchedule, TWorkTime} from '@/app/models';
import {
  generateRecommendedTime,
  sortSchedulesByTime,
  timeMask,
  timePattern,
  timeToNumber,
} from '@/utils';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView} from 'react-native';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import Typography from '../Typography/Typography';
import {
  ContainerStyle,
  ContentWrapperStyle,
  HeaderStyle,
  PlusIconStyle,
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
  const [addScheduleText, setAddScheduleText] = useState<string>('');

  const addScheduleModalRef = useRef<BottomSheetModal>(null);

  const isValidAddScheduleTime = useMemo(() => {
    const addScheduleNumber = timeToNumber(addScheduleText);
    const startNumber = timeToNumber(workTime.start);
    const endNumber = timeToNumber(workTime.end);

    if (addScheduleNumber <= startNumber || addScheduleNumber >= endNumber) {
      return false;
    }

    const isValid = timePattern.test(addScheduleText);

    return isValid;
  }, [addScheduleText, workTime]);

  const openAddScheduleModal = () => {
    if (addScheduleModalRef.current) {
      addScheduleModalRef.current.present();
    }
  };

  const addSchedule = () => {
    const newSchedules = sortSchedulesByTime([
      ...schedules,
      {
        time: addScheduleText,
        active: true,
        recommended: false,
      },
    ]);

    onChange(newSchedules);

    if (addScheduleModalRef.current) {
      addScheduleModalRef.current.dismiss();
      setAddScheduleText('');
    }
  };

  const addToDeleteSet = (schedule: IBarberCreateSchedule) => {
    setDeleteSchedulesSet(prev => [...prev, schedule.time]);
  };

  const selectSchedule = (schedule: IBarberCreateSchedule) => {
    const newSchedules: IBarberCreateSchedule[] = sortSchedulesByTime([
      ...schedules,
      {
        time: schedule.time,
        active: true,
        recommended: false,
      },
    ]);

    onChange(newSchedules);
  };

  const deleteSchedule = (schedule: IBarberCreateSchedule) => {
    const newSchedules = sortSchedulesByTime(
      schedules.filter(item => item.time !== schedule.time),
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

  const generateRecommendedSchedules = useCallback(() => {
    const newSchedules = generateRecommendedTime(
      schedules,
      schedulesByDay,
      workTime,
    );

    setAllSchedules(newSchedules);
  }, [schedules, schedulesByDay, workTime]);

  useEffect(() => {
    generateRecommendedSchedules();
  }, [generateRecommendedSchedules]);

  return (
    <ContainerStyle>
      <HeaderStyle>
        <Typography variant="caption" color="placeholder">
          {t('barber.servicesConfig.fields.scheduleTime')}
        </Typography>
        <PlusIconStyle
          onPress={openAddScheduleModal}
          clickable
          width={22}
          height={22}
          color="primary"
        />
      </HeaderStyle>

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

      <KeyboardAvoidingView enabled>
        <Modal
          ref={addScheduleModalRef}
          title={t('modals.addScheduleTime.title')}
          height={190}>
          <Input
            label={t('modals.addScheduleTime.fields.time')}
            onChangeText={text => {
              const maskedText = timeMask(text);
              setAddScheduleText(maskedText);
            }}
            keyboardType="number-pad"
            value={addScheduleText}
            returnKeyType="done"
            onSubmitEditing={addSchedule}
          />
          <Button
            colorScheme="primary"
            title={t('modals.addScheduleTime.buttons.add')}
            disabled={!isValidAddScheduleTime}
            onPress={addSchedule}
          />
        </Modal>
      </KeyboardAvoidingView>
    </ContainerStyle>
  );
};

export default SelectActiveSchedules;
