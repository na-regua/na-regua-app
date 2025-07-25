import {ModalSizes, TWorkTime} from '@/app/models';
import {
  sortSchedulesByTime,
  timeMask,
  timePattern,
  timeToNumber,
} from '@/utils';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
  schedules: string[];
  onChange: (schedules: string[]) => void;
}

const SelectActiveSchedules: React.FC<ISelectActiveSchedulesProps> = ({
  schedules,
  schedulesByDay,
  workTime,
  onChange,
}) => {
  const {t} = useTranslation();

  const [allSchedules, setAllSchedules] = useState<string[]>(schedules);

  const [deleteSchedulesSet, setDeleteSchedulesSet] = useState<string[]>([]);
  const [addScheduleText, setAddScheduleText] = useState<string>('');

  const addScheduleModalRef = useRef<BottomSheetModal>(null);

  const isValidAddScheduleTime = useMemo(() => {
    const addScheduleNumber = timeToNumber(addScheduleText);
    const startNumber = timeToNumber(workTime.start);
    const endNumber = timeToNumber(workTime.end);

    if (addScheduleNumber < startNumber || addScheduleNumber > endNumber) {
      return false;
    }

    const isValid = timePattern.test(addScheduleText);
    const itsNotInSchedules = !allSchedules.includes(addScheduleText);

    return isValid && itsNotInSchedules;
  }, [addScheduleText, workTime, allSchedules]);

  const canAddMoreSchedules = useMemo(
    () => allSchedules.length < schedulesByDay,
    [allSchedules, schedulesByDay],
  );

  const openAddScheduleModal = () => {
    if (addScheduleModalRef.current) {
      addScheduleModalRef.current.present();
    }
  };

  const onAddSchedule = () => {
    addScheduleModalRef.current?.dismiss();

    const newSchedules = [...allSchedules, addScheduleText];
    const sortedSchedules = sortSchedulesByTime(newSchedules);

    setAllSchedules(sortedSchedules);
    onChange(sortedSchedules);
    setAddScheduleText('');
  };

  const setScheduleToDelete = (schedule: string) => {
    if (deleteSchedulesSet.includes(schedule)) {
      setDeleteSchedulesSet(deleteSchedulesSet.filter(s => s !== schedule));
      const filteredSchedules = allSchedules.filter(s => s !== schedule);
      setAllSchedules(filteredSchedules);

      onChange(filteredSchedules);
    } else {
      setDeleteSchedulesSet([...deleteSchedulesSet, schedule]);
    }
  };

  return (
    <ContainerStyle>
      <HeaderStyle>
        <Typography variant="caption" color="placeholder">
          {t('barber.servicesConfig.fields.scheduleTime')}
        </Typography>
        <PlusIconStyle
          onPress={openAddScheduleModal}
          disabled={!canAddMoreSchedules}
          width={22}
          height={22}
          color={canAddMoreSchedules ? 'primary' : 'disabled'}
        />
      </HeaderStyle>

      <ContentWrapperStyle>
        {allSchedules.length === 0 && (
          <Typography variant="caption" color="black2">
            {'barber.servicesConfig.messages.noSchedules'}
          </Typography>
        )}
        {allSchedules.map((schedule, index) => (
          <SelectScheduleTimeStyle
            active
            key={index}
            activeOpacity={0.6}
            isOnDelete={deleteSchedulesSet.includes(schedule)}
            onPress={() => setScheduleToDelete(schedule)}>
            <SelectScheduleTimeLabelStyle
              active
              variant="button"
              translate={false}>
              {schedule}
            </SelectScheduleTimeLabelStyle>
          </SelectScheduleTimeStyle>
        ))}
      </ContentWrapperStyle>

      <Modal
        ref={addScheduleModalRef}
        title={t('modals.addScheduleTime.title')}
        height={ModalSizes.AddScheduleTime}>
        <Input
          label={t('modals.addScheduleTime.fields.time')}
          onChangeText={text => {
            const maskedText = timeMask(text);
            setAddScheduleText(maskedText);
          }}
          keyboardType="number-pad"
          value={addScheduleText}
          returnKeyType="done"
          onSubmitEditing={onAddSchedule}
        />
        <Button
          colorScheme="primary"
          title={t('modals.addScheduleTime.buttons.add')}
          disabled={!isValidAddScheduleTime}
          onPress={onAddSchedule}
        />
      </Modal>
    </ContainerStyle>
  );
};

export default SelectActiveSchedules;
