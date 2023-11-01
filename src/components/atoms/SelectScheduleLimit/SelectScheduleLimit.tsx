import React, {useState} from 'react';
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
  initialLimit: number;
  onChanged: () => void;
}

const SelectScheduleLimit: React.FC<ISelectScheduleLimitProps> = ({
  initialLimit,
  onChanged,
}) => {
  const [limit, setLimit] = useState<number>(initialLimit);
  const {t} = useTranslation();

  const handleSelectLimit = (newLimit: number) => {
    setLimit(newLimit);
    onChanged();
  };

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
            onPress={() => handleSelectLimit(time.value)}>
            <Typography
              variant="button"
              color={limit === time.value ? 'white3' : 'default'}>
              {t(time.label)}
            </Typography>
          </SelectScheduleStyle>
        ))}
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default SelectScheduleLimit;
