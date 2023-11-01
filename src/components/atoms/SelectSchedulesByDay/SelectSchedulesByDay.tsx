import React from 'react';
import {useTranslation} from 'react-i18next';
import Typography from '../Typography/Typography';
import {
  ContainerStyle,
  InputTextWrapperStyle,
  InputWrapperContainerStyle,
  MinusIconStyle,
  PlusIconStyle,
} from './styles';

interface ISelectSchedulesByDayProps {
  schedulesByDay: number;
  onChange: (schedules: number) => void;
}

const SelectSchedulesByDay: React.FC<ISelectSchedulesByDayProps> = ({
  schedulesByDay,
  onChange,
}) => {
  const {t} = useTranslation();

  const handleChangeSchedule = (value: number) => {
    onChange(value);
  };

  return (
    <ContainerStyle>
      <Typography variant="caption" color="placeholder">
        {t('barber.servicesConfig.fields.schedulesByDay')}
      </Typography>
      <InputWrapperContainerStyle>
        <MinusIconStyle
          clickable
          onPress={() => handleChangeSchedule(schedulesByDay - 1)}
          disabled={schedulesByDay === 0}
        />
        <InputTextWrapperStyle>
          <Typography variant="button">{schedulesByDay}</Typography>
        </InputTextWrapperStyle>
        <PlusIconStyle
          clickable
          onPress={() => handleChangeSchedule(schedulesByDay + 1)}
        />
      </InputWrapperContainerStyle>
    </ContainerStyle>
  );
};

export default SelectSchedulesByDay;
