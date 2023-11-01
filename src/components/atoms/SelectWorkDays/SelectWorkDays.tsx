import React, {useMemo, useState} from 'react';

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
  initialWorkDays: string[];
  onChanged: () => void;
}

const SelectWorkDays: React.FC<ISelectWorkDaysProps> = ({
  initialWorkDays,
  onChanged,
}) => {
  const {t} = useTranslation();
  const [workDays, setWorkDays] = useState<string[]>(initialWorkDays);

  const workDaysChanged = useMemo(() => {
    if (workDays.length !== initialWorkDays.length) {
      return true;
    }

    const [bigger, smaller] =
      workDays.length > initialWorkDays.length
        ? [workDays, initialWorkDays]
        : [initialWorkDays, workDays];

    const hasDiff = bigger
      .map(day => smaller.includes(day))
      .some(item => !item);

    return hasDiff;
  }, [workDays, initialWorkDays]);

  const handleSelectWorkDays = (day: string) => {
    if (workDays.includes(day)) {
      setWorkDays(workDays.filter(item => item !== day));
    } else {
      setWorkDays([...workDays, day]);
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
