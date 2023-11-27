import React from 'react';

import {useTranslation} from 'react-i18next';
import {WEEK_DAYS, WEEK_DAY_TO_PT_BR} from '../Calendar';
import Typography from '../Typography/Typography';
import {
  SelectDayStyle,
  SelectDaysContainerStyle,
  WorkDaysContainerStyle,
  styles,
} from './styles';

interface ISelectWorkDaysProps {
  workDays: string[];
  onChange: (workDays: string[]) => void;
}

const SelectWorkDays: React.FC<ISelectWorkDaysProps> = ({
  workDays,
  onChange,
}) => {
  const {t} = useTranslation();

  const handleSelectWorkDays = (day: string) => {
    if (workDays.includes(day)) {
      onChange(workDays.filter(item => item !== day));
    } else {
      onChange([...workDays, day]);
    }
  };

  return (
    <WorkDaysContainerStyle>
      <Typography variant="caption" color="placeholder">
        {t('barber.servicesConfig.fields.workDays')}
      </Typography>
      <SelectDaysContainerStyle
        contentContainerStyle={styles.scrollContentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {WEEK_DAYS.map((day, index) => (
          <SelectDayStyle
            key={index}
            active={workDays.includes(day)}
            activeOpacity={0.8}
            onPress={() => handleSelectWorkDays(day)}>
            <Typography
              variant="button"
              color={workDays.includes(day) ? 'white3' : 'default'}>
              {WEEK_DAY_TO_PT_BR[day][0]}
            </Typography>
          </SelectDayStyle>
        ))}
      </SelectDaysContainerStyle>
    </WorkDaysContainerStyle>
  );
};

export default SelectWorkDays;
