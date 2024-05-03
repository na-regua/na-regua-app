import {CalendarContext, Icons} from '@/components/atoms';
import React, {useContext, useMemo} from 'react';
import {CalendarActionsWrapperStyled} from './styles';

export interface CalendarActionsProps {
  showDoublePress?: boolean;
  showSingle?: boolean;
}

const CalendarActions: React.FC<CalendarActionsProps> = ({
  showSingle = true,
  showDoublePress,
}) => {
  const iconsSize = 22;

  const {selectedDate, updateSelectedDate, isDisabledDate} =
    useContext(CalendarContext);

  const leftDisabled = useMemo(() => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);

    return isDisabledDate(prevDate);
  }, [selectedDate, isDisabledDate]);

  const rightDisabled = useMemo(() => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return isDisabledDate(nextDate);
  }, [isDisabledDate, selectedDate]);
  const doubleLeftDisabled = useMemo(() => true, []);
  const doubleRightDisabled = useMemo(() => true, []);

  const onLeftPress = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);

    if (!leftDisabled) {
      updateSelectedDate(prevDate);
    }
  };
  const onRightPress = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    if (!rightDisabled) {
      updateSelectedDate(nextDate);
    }
  };

  const onDoubleLeftPress = () => {};
  const onDoubleRightPress = () => {};

  return (
    <CalendarActionsWrapperStyled>
      {showDoublePress && (
        <Icons.ChevronDoubleLeftIcon
          width={iconsSize}
          height={iconsSize}
          strokeWidth={2}
          disabled={doubleLeftDisabled}
          onPress={onDoubleLeftPress}
          color={doubleLeftDisabled ? 'disabled' : 'primary'}
        />
      )}
      {showSingle && (
        <>
          <Icons.ChevronLeftIcon
            width={iconsSize}
            height={iconsSize}
            strokeWidth={2}
            disabled={leftDisabled}
            onPress={onLeftPress}
            color={leftDisabled ? 'disabled' : 'primary'}
          />
          <Icons.ChevronRightIcon
            width={iconsSize}
            height={iconsSize}
            strokeWidth={2}
            disabled={rightDisabled}
            color={rightDisabled ? 'disabled' : 'primary'}
            onPress={onRightPress}
          />
        </>
      )}
      {showDoublePress && (
        <Icons.ChevronDoubleRightIcon
          width={iconsSize}
          height={iconsSize}
          strokeWidth={2}
          onPress={onDoubleRightPress}
          disabled={doubleRightDisabled}
          color={doubleRightDisabled ? 'disabled' : 'primary'}
        />
      )}
    </CalendarActionsWrapperStyled>
  );
};

export {CalendarActions};
