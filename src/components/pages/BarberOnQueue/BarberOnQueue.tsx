import React, {useCallback, useEffect, useMemo} from 'react';

import {Button, Loader, MenuItem} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {fetchPersistedViewMode} from '@/store/slicers';
import {Colors} from '@/theme';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  OnQueueActionsRowStyled,
  OnQueueActionsStyled,
  OnQueueButtonStyled,
  OnQueueContainerStyled,
  OnQueueContentStyled,
  OnQueueLoaderWrapperStyled,
  OnQueueScrollStyled,
} from './styles';
import {OnQueueHeader} from '@/components/molecules';

const BarberOnQueue = () => {
  const insets = useSafeAreaInsets();

  const navigator = useAppNavigation();
  const route = useRoute();

  const {todayQueue, loadingTodayQueue} = useSelector(
    (state: RootState) => state.queue,
  );
  const dispatch = useDispatch<AppDispatch>();
  const {viewMode} = useSelector((state: RootState) => state.queue);

  const isFs = useMemo(
    () => viewMode === 'fs' && route.name === '/barber/queue/fs',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewMode],
  );

  const getPersistedViewMode = useCallback(async () => {
    await dispatch(fetchPersistedViewMode());
  }, [dispatch]);

  useEffect(() => {
    getPersistedViewMode();
  }, [getPersistedViewMode]);

  useEffect(() => {
    if (viewMode === 'fs' && route.name !== '/barber/queue/fs') {
      navigator.navigate('/barber/queue/fs');
    }

    if (viewMode === 'fs-out' && route.name !== '/barber/queue') {
      navigator.navigate('/barber/queue');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  if (!todayQueue) {
    return null;
  }

  return (
    <OnQueueContainerStyled fs={isFs} insets={insets}>
      <OnQueueContentStyled fs={isFs}>
        <OnQueueHeader />
        <OnQueueScrollStyled showsVerticalScrollIndicator={false}>
          {!loadingTodayQueue &&
            todayQueue.tickets.map((ticket, index) => (
              <MenuItem
                key={index}
                title={ticket.customer.name}
                avatar={ticket.customer.avatar.url}
                description={ticket.service?.name}
                clickable
              />
            ))}
          {loadingTodayQueue && (
            <OnQueueLoaderWrapperStyled>
              <Loader size="128" color={Colors.primary} />
            </OnQueueLoaderWrapperStyled>
          )}
        </OnQueueScrollStyled>
        <OnQueueActionsStyled>
          <OnQueueActionsRowStyled>
            {todayQueue.status === 'on' && (
              <OnQueueButtonStyled
                title="barber.onQueue.buttons.pause"
                colorScheme="default"
                variant="outlined"
              />
            )}
            {todayQueue.status === 'paused' && (
              <OnQueueButtonStyled
                title="barber.onQueue.buttons.resume"
                colorScheme="success"
              />
            )}
            <OnQueueButtonStyled
              title="barber.onQueue.buttons.finish"
              colorScheme="danger"
            />
          </OnQueueActionsRowStyled>
          <Button title="barber.onQueue.buttons.next" colorScheme="primary" />
        </OnQueueActionsStyled>
      </OnQueueContentStyled>
    </OnQueueContainerStyled>
  );
};

export {BarberOnQueue};
