import Typography from '@/components/atoms/Typography/Typography';
import React, {useContext, useMemo} from 'react';
import {CalendarContext} from '../../Calendar';
import {
  compareDays,
  getDayName,
  getDayWithO,
  getNextDaysFromLimit,
} from '../../utils/dateTo';
import {
  HDPDayStyled,
  HDPDotStyled,
  HDPScrollStyled,
  HDPTextGroupStyled,
  HDPWrapperStyled,
} from './styles';

export interface HorizontalDayPickerProps {
  initialDate?: Date;
  daysLimit?: number;
}

const HorizontalDayPicker: React.FC<HorizontalDayPickerProps> = ({
  initialDate,
  daysLimit = 14,
}) => {
  const {
    initialSelectedDate,
    selectedDate,
    updateSelectedDate,
    showMarker,
    markedDates,
  } = useContext(CalendarContext);
  const firstDay = initialDate || initialSelectedDate;
  const CARD_DAY_WIDTH = 58;

  const days = useMemo(
    () => getNextDaysFromLimit(firstDay, daysLimit),
    [daysLimit, firstDay],
  );

  const selectedDateIndex = useMemo(() => {
    let activeIndex = days.findIndex(day => compareDays(day, selectedDate));

    if (activeIndex < 2) {
      return 0;
    }

    if (activeIndex > 1) {
      return activeIndex - 2;
    }

    return activeIndex;
  }, [days, selectedDate]);

  const isActive = (day: Date) => {
    return compareDays(day, selectedDate);
  };

  const onDayPress = (day: Date) => {
    updateSelectedDate(day);
  };

  return (
    <HDPWrapperStyled>
      <HDPScrollStyled
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.998}
        contentOffset={{
          x: selectedDateIndex * (CARD_DAY_WIDTH + 18),
          y: 0,
        }}>
        {days.map((day, index) => (
          <HDPDayStyled
            key={index}
            activeOpacity={0.6}
            active={isActive(day)}
            onPress={() => onDayPress(day)}
            width={CARD_DAY_WIDTH}>
            <HDPTextGroupStyled>
              <Typography
                variant="h4"
                textAlign="center"
                color={isActive(day) ? 'white3' : 'black2'}>
                {getDayWithO(day)}
              </Typography>
              <Typography
                variant="tip"
                textAlign="center"
                color={isActive(day) ? 'white3' : 'black2'}>
                {getDayName(day)}
              </Typography>
            </HDPTextGroupStyled>
            {markedDates &&
              markedDates.length > 0 &&
              showMarker &&
              markedDates.some(compareDay => compareDays(compareDay, day)) && (
                <HDPDotStyled active={isActive(day)} />
              )}
          </HDPDayStyled>
        ))}
      </HDPScrollStyled>
    </HDPWrapperStyled>
  );
};

export {HorizontalDayPicker};
