import {TWorkTime} from '@/app/models';
import {Colors} from '@/theme';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {DAY_TIMES} from '../Calendar';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import {
  SelectTimeButton,
  SelectTimeContainerStyle,
  SelectTimeScrollStyle,
  SelectTimeWrapperStyle,
  WorkTimeContainerStyle,
} from './styles';
import {timeToNumber} from '@/utils';

interface ISelectWorkTimeProps {
  workTime: TWorkTime;
  onChange: (workTime: TWorkTime) => void;
}

const SelectWorkTime: React.FC<ISelectWorkTimeProps> = ({
  workTime,
  onChange,
}) => {
  const {t} = useTranslation();
  const scrollRef = useRef<ScrollView>(null);

  const startWorkTimeNumber = useMemo(
    () => timeToNumber(workTime.start),
    [workTime],
  );
  const endWorkTimeNumber = useMemo(
    () => timeToNumber(workTime.end),
    [workTime],
  );
  const [selectWorkTime, setSelectWorkTime] =
    useState<keyof TWorkTime>('start');

  const isOnTimeRange = (time: string): boolean => {
    const startNumber = timeToNumber(workTime.start);
    const endNumber = timeToNumber(workTime.end);

    const timeNumber = timeToNumber(time);

    return timeNumber >= startNumber && timeNumber <= endNumber;
  };

  const setSelectToStart = () => {
    setSelectWorkTime('start');

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: startWorkTimeNumber * 1,
        y: 0,
      });
    }
  };

  const setSelectToEnd = () => {
    setSelectWorkTime('end');

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: endWorkTimeNumber * 1,
        y: 0,
      });
    }
  };

  const handleSelectWorkTime = (time: string) => {
    if (selectWorkTime === 'start') {
      onChange({...workTime, start: time});
      setSelectToEnd();
    } else {
      onChange({...workTime, end: time});
      setSelectToStart();
    }
  };

  return (
    <WorkTimeContainerStyle>
      <Typography variant="caption" color="placeholder">
        {t('barber.servicesConfig.fields.workTime')}
      </Typography>
      <SelectTimeContainerStyle>
        <Icons.SunIcon
          clickable
          onPress={setSelectToStart}
          color={selectWorkTime === 'start' ? 'warning' : 'default'}
        />
        <SelectTimeScrollStyle
          as={ScrollView}
          ref={scrollRef}
          horizontal
          contentOffset={{x: startWorkTimeNumber * 1, y: 0}}
          showsHorizontalScrollIndicator={false}>
          <SelectTimeWrapperStyle onStartShouldSetResponder={() => true}>
            {DAY_TIMES.map((time, index) => (
              <SelectTimeButton
                key={index}
                onPress={() => handleSelectWorkTime(time)}
                active={isOnTimeRange(time)}
                isStart={time === workTime.start}
                isEnd={time === workTime.end}
                selectedStart={selectWorkTime === 'start'}
                selectedEnd={selectWorkTime === 'end'}
                activeOpacity={0.8}
                activeColor={
                  selectWorkTime === 'start' ? Colors.warning : Colors.main
                }>
                <Typography
                  variant="button"
                  color={isOnTimeRange(time) ? 'white3' : 'default'}>
                  {time}
                </Typography>
              </SelectTimeButton>
            ))}
          </SelectTimeWrapperStyle>
        </SelectTimeScrollStyle>
        <Icons.MoonIcon
          clickable
          onPress={setSelectToEnd}
          color={selectWorkTime === 'end' ? 'main' : 'default'}
        />
      </SelectTimeContainerStyle>
    </WorkTimeContainerStyle>
  );
};

export default SelectWorkTime;
