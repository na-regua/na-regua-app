import {IBarberService, TAttendanceType} from '@/app/models';
import {Button, Icons, Typography} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {CutActions} from '@/store/slicers';
import {generateAddress} from '@/utils';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FadeInLeft} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  AttendanceBarberInfoItemStyled,
  AttendanceBarberInfoStyled,
  AttendanceBarberItemImageStyled,
  AttendanceBarberItemStyled,
  AttendanceBarberItemTitleStyled,
  AttendanceContentStyled,
  AttendanceItemGroupStyled,
  AttendanceItemIconStyled,
  AttendanceItemStyled,
  AttendanceSectionContentStyled,
  AttendanceSectionStyled,
  OtherButtonContentStyled,
  PageCardFooterStyled,
} from '../../styles';

const AttendanceFooter = () => {
  const {t} = useTranslation();
  const {attendanceType, selectedBarber, selectedService} = useSelector(
    (state: RootState) => state.cut,
  );
  const dispatch = useDispatch<AppDispatch>();

  const selectOtherBarber = () => {
    dispatch(CutActions.setCutStep('select'));
    dispatch(CutActions.setCutSelectedBarber(null));
  };

  const canJoinQueue = useMemo(
    () => !!selectedBarber && !!selectedService,
    [selectedBarber, selectedService],
  );

  return (
    <PageCardFooterStyled>
      <Button
        variant="ghost"
        colorScheme="primary"
        customContent={
          <OtherButtonContentStyled>
            <Icons.ArrowLeftIcon color="primary" disabled />
            <Typography variant="button" color="primary">
              {'customer.cut.buttons.other'}
            </Typography>
          </OtherButtonContentStyled>
        }
        onPress={selectOtherBarber}
      />

      {attendanceType === 'queue' && (
        <Button
          fillSpace
          colorScheme="main"
          title="customer.cut.buttons.join"
          disabled={!canJoinQueue}
        />
      )}
      {attendanceType === 'schedule' && (
        <Button
          fillSpace
          colorScheme="main"
          title="customer.cut.buttons.schedule"
        />
      )}
    </PageCardFooterStyled>
  );
};

const Attendance = () => {
  const {t} = useTranslation();
  const {attendanceType, selectedBarber, selectedService, services} =
    useSelector((state: RootState) => state.cut);
  const dispatch = useDispatch<AppDispatch>();

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
      <AttendanceBarberItemStyled>
        <AttendanceBarberItemImageStyled
          source={{
            uri: selectedBarber.avatar.url,
          }}
        />
        <AttendanceBarberItemTitleStyled>
          <Typography variant="h6" color="black3">
            {selectedBarber.name}
          </Typography>
          <AttendanceBarberInfoItemStyled>
            <Icons.StarIcon />
            <Typography variant="caption" color="black3" translate={false}>
              {'4.5'}
            </Typography>
          </AttendanceBarberInfoItemStyled>
        </AttendanceBarberItemTitleStyled>
      </AttendanceBarberItemStyled>
      <AttendanceBarberInfoStyled>
        <AttendanceBarberInfoItemStyled>
          <Icons.TimeIcon width={16} height={16} color="main" />
          <Typography variant="caption" color="black2" translate={false}>
            {selectedBarber.config.workTime.start +
              ' - ' +
              selectedBarber.config.workTime.end}
          </Typography>
        </AttendanceBarberInfoItemStyled>
        <AttendanceBarberInfoItemStyled>
          <Icons.MarkerIcon color="main" />
          <Typography variant="caption" color="black2" translate={false}>
            {generateAddress(selectedBarber.address)}
          </Typography>
        </AttendanceBarberInfoItemStyled>
      </AttendanceBarberInfoStyled>
      <AttendanceSectionStyled>
        <Typography variant="body1">
          {'customer.cut.attendance.select.type'}
        </Typography>
        <AttendanceSectionContentStyled>
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
                  color={attendanceType === 'queue' ? 'main' : 'black2'}>
                  {'customer.cut.attendance.types.queue'}
                </Typography>
                <Typography
                  variant="tip"
                  translateProps={{total: '2'}}
                  color={attendanceType === 'queue' ? 'main' : 'black1'}>
                  {'customer.cut.attendance.types.queueDesc'}
                </Typography>
              </AttendanceBarberItemTitleStyled>
            </>
          </AttendanceItemStyled>
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
                  color={attendanceType === 'schedule' ? 'main' : 'black1'}>
                  {'customer.cut.attendance.types.scheduleDesc'}
                </Typography>
              </AttendanceBarberItemTitleStyled>
            </>
          </AttendanceItemStyled>
        </AttendanceSectionContentStyled>
      </AttendanceSectionStyled>
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

export {Attendance, AttendanceFooter};
