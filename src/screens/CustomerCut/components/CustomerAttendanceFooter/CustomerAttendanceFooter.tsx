import {QueueService} from '@/app/api';
import {Button, Icons, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {CutActions, CutThunks, TicketViewActions} from '@/store/slicers';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  OtherButtonContentStyled,
  PageCardFooterStyled,
} from '../CustomerAttendance/styles';

const CustomerAttendanceFooter = () => {
  const {
    attendanceType,
    selectedBarber,
    selectedService,
    selectedAdditionalServices,
  } = useSelector((state: RootState) => state.cut);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const [joining, setJoining] = useState(false);

  const selectOtherBarber = () => {
    dispatch(CutActions.setCutStep('select'));
    dispatch(CutActions.setCutSelectedBarber(null));
  };

  const canJoinQueue = useMemo(
    () => !!selectedBarber && !!selectedService,
    [selectedBarber, selectedService],
  );

  const joinQueue = async () => {
    if (selectedBarber && selectedService) {
      setJoining(true);

      try {
        const additionalServicesId =
          selectedAdditionalServices?.map(s => s._id) || [];

        const {data} = await QueueService.userJoin(
          selectedBarber.code,
          selectedService._id,
          additionalServicesId,
        );

        if (data.ticket) {
          dispatch(TicketViewActions.setTicket(data.ticket));
          if (data.ticket.queue) {
            dispatch(TicketViewActions.setQueue(data.ticket.queue.queue_dto));
          }

          setJoining(false);

          navigation.navigate('/customer/on-ticket');

          dispatch(CutActions.resetCut());

          await dispatch(CutThunks.fetchTodayTickets());
        }
      } catch (error) {
        setJoining(false);
      }
    }
  };

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
          onPress={joinQueue}
          loading={joining}
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

export {CustomerAttendanceFooter};
