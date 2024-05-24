import {IBarberService, SocketUrls, TAttendanceType} from '@/app/models';
import {BarberInfoCard, Icons, Typography} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {CutActions} from '@/store/slicers';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FadeInLeft} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {LineStyled} from '../../styles';
import {
  AttendanceBarberItemTitleStyled,
  AttendanceContentStyled,
  AttendanceIsCustomerStyled,
  AttendanceItemGroupStyled,
  AttendanceItemIconStyled,
  AttendanceItemStyled,
  AttendanceSectionContentStyled,
  AttendanceSectionStyled,
} from './styles';

const CustomerAttendance = () => {
  const {t} = useTranslation();
  const {user} = useSelector((state: RootState) => state.auth);
  const {
    attendanceType,
    barberTodayQueue,
    selectedBarber,
    selectedService,
    services,
  } = useSelector((state: RootState) => state.cut);
  const {socket, connected} = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch<AppDispatch>();

  const isCustomer = useMemo(
    () =>
      selectedBarber &&
      selectedBarber.customers.some(customer => customer._id === user?._id),
    [selectedBarber, user],
  );

  const queueStatus = useMemo(() => {
    if (barberTodayQueue) {
      if (barberTodayQueue.status === 'off') {
        return t('customer.cut.attendance.types.queueOff');
      }

      if (barberTodayQueue.status === 'paused') {
        return t('customer.cut.attendance.types.queuePaused');
      }
    }

    return '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barberTodayQueue]);

  const getBarberLiveUpdates = useCallback(() => {
    console.log('Joining socket sub');
    if (!!socket && connected && selectedBarber) {
      const url = SocketUrls.BarberInfo.replace(
        '{{barberId}}',
        selectedBarber._id.toString(),
      );
      socket.on(url, data => {
        if (data.barber) {
          console.log('Barber updated', data.barber);
          dispatch(CutActions.setCutSelectedBarber(data.barber));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanSocketSub = () => {
    console.log('Cleaning socket sub');
    if (socket && connected && selectedBarber) {
      const url = SocketUrls.BarberInfo.replace(
        '{{barberId}}',
        selectedBarber._id.toString(),
      );
      socket.off(url);
    }
  };

  useEffect(() => {
    getBarberLiveUpdates();

    return cleanSocketSub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBarberLiveUpdates]);

  if (!selectedBarber) {
    return null;
  }

  const onSelectAttendanceType = (type: TAttendanceType) => {
    dispatch(CutActions.setAttendanceType(type));
  };

  const onSelectService = (service: IBarberService) => {
    dispatch(CutActions.setCutSelectedService(service));
  };

  return (
    <AttendanceContentStyled entering={FadeInLeft}>
      {/* <Typography variant="h4">{'customer.cut.attendance.title'}</Typography> */}
      <BarberInfoCard barber={selectedBarber} />
      {isCustomer && (
        <AttendanceIsCustomerStyled>
          <Icons.UserCheckIcon
            width={16}
            height={16}
            strokeWidth={2}
            color="main"
          />
          <Typography variant="caption" color="white3">
            {'customer.cut.attendance.isCustomer'}
          </Typography>
        </AttendanceIsCustomerStyled>
      )}
      <LineStyled />
      <AttendanceSectionStyled>
        <Typography variant="body1">
          {'customer.cut.attendance.select.type'}
        </Typography>
        <AttendanceSectionContentStyled>
          {barberTodayQueue && (
            <AttendanceItemStyled
              active={attendanceType === 'queue'}
              onPress={() => onSelectAttendanceType('queue')}>
              <>
                <AttendanceItemIconStyled>
                  <Icons.TimeIcon
                    width={24}
                    height={24}
                    color={attendanceType === 'queue' ? 'main' : 'black2'}
                  />
                </AttendanceItemIconStyled>
                <AttendanceBarberItemTitleStyled>
                  <Typography
                    variant="body1"
                    color={attendanceType === 'queue' ? 'main' : 'black2'}
                    translate={false}>
                    {t('customer.cut.attendance.types.queue')} {queueStatus}
                  </Typography>
                  <Typography
                    variant="tip"
                    weight="medium"
                    translateProps={{total: barberTodayQueue.tickets.length}}
                    color={attendanceType === 'queue' ? 'main' : 'black1'}>
                    {'customer.cut.attendance.types.queueDesc'}
                  </Typography>
                </AttendanceBarberItemTitleStyled>
              </>
            </AttendanceItemStyled>
          )}
          <AttendanceItemStyled
            active={attendanceType === 'schedule'}
            onPress={() => onSelectAttendanceType('schedule')}>
            <>
              <AttendanceItemIconStyled>
                <Icons.ScheduleIcon
                  width={24}
                  height={22}
                  color={attendanceType === 'schedule' ? 'main' : 'black2'}
                />
              </AttendanceItemIconStyled>
              <AttendanceBarberItemTitleStyled>
                <Typography
                  variant="body1"
                  color={attendanceType === 'schedule' ? 'main' : 'black2'}>
                  {'customer.cut.attendance.types.schedule'}
                </Typography>
                <Typography
                  variant="tip"
                  translateProps={{total: '2'}}
                  weight="medium"
                  color={attendanceType === 'schedule' ? 'main' : 'black1'}>
                  {'customer.cut.attendance.types.scheduleDesc'}
                </Typography>
              </AttendanceBarberItemTitleStyled>
            </>
          </AttendanceItemStyled>
        </AttendanceSectionContentStyled>
      </AttendanceSectionStyled>
      <LineStyled />
      <AttendanceSectionStyled>
        <Typography variant="body1">
          {'customer.cut.attendance.select.service'}
        </Typography>
        {!!services &&
          services.map(service => {
            const isActive = selectedService?._id === service._id;

            return (
              <AttendanceItemStyled
                active={isActive}
                onPress={() => onSelectService(service)}
                justifyContent="space-between"
                key={service._id}>
                <>
                  <AttendanceItemGroupStyled>
                    <AttendanceItemIconStyled>
                      {service.icon === 'maquina' && (
                        <Icons.MaquinaIcon
                          width={18}
                          height={20}
                          color={isActive ? 'main' : 'black2'}
                        />
                      )}
                      {service.icon === 'pente' && (
                        <Icons.PenteIcon
                          width={20}
                          height={20}
                          color={isActive ? 'main' : 'black2'}
                        />
                      )}
                      {service.icon === 'navalha' && (
                        <Icons.NavalhaIcon
                          width={24}
                          height={15}
                          color={isActive ? 'main' : 'black2'}
                        />
                      )}
                    </AttendanceItemIconStyled>
                    <AttendanceBarberItemTitleStyled>
                      <Typography
                        variant="body1"
                        color={isActive ? 'main' : 'black2'}
                        translate={false}>
                        {service.name}
                      </Typography>
                    </AttendanceBarberItemTitleStyled>
                  </AttendanceItemGroupStyled>
                  <AttendanceItemGroupStyled>
                    <Typography
                      variant="body1"
                      translate={false}
                      color={isActive ? 'main' : 'default'}>
                      {t('currency.symbol')} {service.price}
                    </Typography>
                  </AttendanceItemGroupStyled>
                </>
              </AttendanceItemStyled>
            );
          })}
      </AttendanceSectionStyled>
    </AttendanceContentStyled>
  );
};

export {CustomerAttendance};
