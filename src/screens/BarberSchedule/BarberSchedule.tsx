import {AppStatusBar, Calendar, Icons, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {RootState} from '@/store/Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  ScheduleContainerStyled,
  ScheduleGroupItemHeaderStyled,
  ScheduleGroupItemStyled,
  ScheduleScrollContentStyled,
} from './styles';
import {addDays} from 'date-fns';

const BarberSchedule: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/schedule'>
> = () => {
  const {barber} = useSelector((state: RootState) => state.auth);

  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  if (!barber) {
    return null;
  }

  const showAddManuallyModal = () => {};

  return (
    <ScheduleContainerStyled style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.Actions />
        <Header.Welcome />
        <Header.Border />
      </Header.Container>
      <ScheduleScrollContentStyled>
        <ScheduleGroupItemStyled>
          <Calendar
            initialSelectedDate={new Date()}
            onSelectedDateChange={() => {}}
            showMarker
            markedDates={[new Date()]}
            showActions
            titleProps={{show: ['day', 'month'], disable: ['month']}}
            actionsProps={{
              showDoublePress: false,
            }}
            disableDates={(date, opts) => {
              if (opts?.horizontalStartDate) {
                const scheduleLimit = addDays(
                  opts.horizontalStartDate,
                  barber.config.scheduleLimitDays - 1,
                );

                return date < opts.horizontalStartDate || date > scheduleLimit;
              }

              return false;
            }}
            horizontalPickerProps={{
              initialDate: new Date(),
              daysLimit: barber.config.scheduleLimitDays,
            }}
          />
        </ScheduleGroupItemStyled>
        <ScheduleGroupItemStyled expand>
          <ScheduleGroupItemHeaderStyled>
            <Typography variant="h6" color="black3">
              {'barber.schedule.title'}
            </Typography>

            <Icons.PlusIcon
              width={20}
              height={20}
              clickable
              strokeWidth={2}
              color="primary"
              onPress={showAddManuallyModal}
            />
          </ScheduleGroupItemHeaderStyled>
        </ScheduleGroupItemStyled>
      </ScheduleScrollContentStyled>
    </ScheduleContainerStyled>
  );
};

export default BarberSchedule;
