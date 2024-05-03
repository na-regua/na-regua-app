import {Typography} from '@/components/atoms';
import React, {useContext, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {CalendarContext} from '../../Calendar';
import {MONTHS} from '../../models/constants';
import {
  CalendarScrollRowStyled,
  CalendarTouchableScrollItemStyled,
} from '../../utils';

interface SelectMonthProps {}

const SelectMonth: React.FC<SelectMonthProps> = ({}) => {
  const {t} = useTranslation();
  const {selectedDate, updateSelectedDate} = useContext(CalendarContext);

  const scrollRef = useRef<Animated.ScrollView>(null);
  const [scrollPositionRecord, setScrollPositionRecord] = useState<
    {index: number; position: number}[]
  >([]);

  const isActive = (month: number) => month === selectedDate.getMonth();

  const onSelectMonth = (month: number) => {
    const newDate = new Date(selectedDate);

    newDate.setMonth(month);

    updateSelectedDate(newDate);

    const scrollPosition = scrollPositionRecord.find(
      record => record.index === month,
    );

    const previousPosition = scrollPositionRecord.find(
      record => record.index === month - 2,
    );

    const diff =
      (scrollPosition?.position || 0) - (previousPosition?.position || 0);

    if (scrollPosition) {
      scrollRef.current?.scrollTo({
        x: scrollPosition.position - diff,
        animated: true,
      });
    }
  };

  return (
    <CalendarScrollRowStyled
      as={Animated.ScrollView}
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={scrollRef}
      scrollEventThrottle={16}
      decelerationRate={0.998}>
      {MONTHS.map((month, index) => (
        <CalendarTouchableScrollItemStyled
          key={index}
          onPress={() => onSelectMonth(index)}
          onLayout={event => {
            if (event.nativeEvent.layout.x) {
              const oldPosition = scrollPositionRecord.find(
                el => el.index === index,
              )?.position;
              const position = event.nativeEvent.layout.x || 0;

              if (!oldPosition || oldPosition !== position) {
                setScrollPositionRecord(prev => [
                  ...prev,
                  {
                    index,
                    position,
                  },
                ]);
              }
            }
          }}>
          <Typography
            variant={isActive(index) ? 'h5' : 'h6'}
            color={isActive(index) ? 'primary' : 'default'}>
            {t(`calendar.months.full.${month}`)}
          </Typography>
        </CalendarTouchableScrollItemStyled>
      ))}
    </CalendarScrollRowStyled>
  );
};

export {SelectMonth};
