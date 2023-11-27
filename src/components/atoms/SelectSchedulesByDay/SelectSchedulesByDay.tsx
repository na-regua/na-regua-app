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
  schedulesLength: number;
  onChange: (schedules: number) => void;
}

const SelectSchedulesByDay: React.FC<ISelectSchedulesByDayProps> = ({
  schedulesByDay,
  schedulesLength,
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
          disabled={schedulesByDay === schedulesLength}
          color={schedulesByDay === schedulesLength ? 'black3' : 'white3'}
        />
        <InputTextWrapperStyle>
          <Typography variant="button">{schedulesByDay}</Typography>
        </InputTextWrapperStyle>
        <PlusIconStyle
          clickable
          color="white3"
          onPress={() => handleChangeSchedule(schedulesByDay + 1)}
        />
      </InputWrapperContainerStyle>
    </ContainerStyle>
  );
};

export default SelectSchedulesByDay;
