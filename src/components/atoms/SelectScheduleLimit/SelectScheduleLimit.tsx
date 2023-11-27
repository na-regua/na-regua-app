import React from 'react';
import {useTranslation} from 'react-i18next';
import {SCHEDULE_DEFAULT_TIMES} from '../Calendar';
import Typography from '../Typography/Typography';
import {
  ContainerStyle,
  ScrollContentStyle,
  SelectScheduleStyle,
  styles,
} from './styles';

interface ISelectScheduleLimitProps {
  limit: number;
  onChange: (limit: number) => void;
}

const SelectScheduleLimit: React.FC<ISelectScheduleLimitProps> = ({
  limit,
  onChange,
}) => {
  const {t} = useTranslation();

  return (
    <ContainerStyle>
      <Typography variant="caption" color="placeholder">
        {t('barber.servicesConfig.fields.scheduleLimit')}
      </Typography>
      <ScrollContentStyle
        contentContainerStyle={styles.scrollContentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {SCHEDULE_DEFAULT_TIMES.map((time, index) => (
          <SelectScheduleStyle
            active={limit === time.value}
            key={index}
            activeOpacity={0.8}
            onPress={() => onChange(time.value)}>
            <Typography
              variant="button"
              color={limit === time.value ? 'white3' : 'main'}>
              {t(time.label)}
            </Typography>
          </SelectScheduleStyle>
        ))}
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default SelectScheduleLimit;
