import React, {useCallback, useEffect, useMemo} from 'react';

import {TOnQueueViewModes} from '@/app/models';
import {Button, Icons, Loader, MenuItem, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  fetchIsOnQueue,
  fetchPersistedViewMode,
  persistViewMode,
  setFilters,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {TColorsType} from '@/theme/colors';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  OnQueueActionsRowStyled,
  OnQueueActionsStyled,
  OnQueueButtonStyled,
  OnQueueContainerStyled,
  OnQueueContentStyled,
  OnQueueFilterOldTicketsStyled,
  OnQueueFiltersStyled,
  OnQueueHeaderActionsStyled,
  OnQueueHeaderRowStyled,
  OnQueueHeaderStyled,
  OnQueueLoaderWrapperStyled,
  OnQueueScrollStyled,
  OnQueueTitleStyled,
} from './styles';

const BarberOnQueue = () => {
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();

  const navigator = useAppNavigation();
  const route = useRoute();

  const {todayQueue, filters, loadingTodayQueue} = useSelector(
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

  const titleColor: TColorsType = useMemo(() => {
    if (!todayQueue) {
      return 'placeholder';
    }

    if (todayQueue.status === 'on') {
      return 'success';
    }

    if (todayQueue.status === 'paused') {
      return 'warning';
    }

    return 'danger';
  }, [todayQueue]);

  const applyOldTicketsFilter = () => {
    dispatch(setFilters({showServedTickets: !filters?.showServedTickets}));
  };

  const setFullscreenViewMode = () => {
    const newViewMode: TOnQueueViewModes = viewMode === 'fs' ? 'fs-out' : 'fs';

    dispatch(persistViewMode(newViewMode));
  };

  const onRefresh = () => {
    dispatch(fetchIsOnQueue());
  };

  if (!todayQueue) {
    return null;
  }

  return (
    <OnQueueContainerStyled fs={isFs} insets={insets}>
      <OnQueueContentStyled fs={isFs}>
        <OnQueueHeaderStyled>
          <OnQueueHeaderRowStyled>
            <OnQueueTitleStyled color={titleColor} variant="h5">
              {'barber.onQueue.titles.on'}
            </OnQueueTitleStyled>

            <OnQueueHeaderActionsStyled>
              <Icons.RefreshIcon onPress={onRefresh} />
              {viewMode === 'fs-out' ? (
                <Icons.FullscreenIcon
                  onPress={() => setFullscreenViewMode()}
                  color="default"
                />
              ) : (
                <Icons.FullscreenOutIcon
                  onPress={() => setFullscreenViewMode()}
                />
              )}
            </OnQueueHeaderActionsStyled>
          </OnQueueHeaderRowStyled>
          <OnQueueHeaderRowStyled>
            <Typography variant="caption" color="placeholder">
              {t('barber.onQueue.subtitles.total', {
                total: todayQueue.tickets.length,
              })}
            </Typography>
            <Typography variant="caption" color="placeholder">
              {t('barber.onQueue.subtitles.totalServed', {
                total: todayQueue.serveds.length,
              })}
            </Typography>
          </OnQueueHeaderRowStyled>
        </OnQueueHeaderStyled>
        {filters && (
          <OnQueueFiltersStyled>
            {
              <OnQueueFilterOldTicketsStyled
                active={filters.showServedTickets}
                onPress={applyOldTicketsFilter}>
                {filters.showServedTickets ? (
                  <Icons.ChevronDownIcon
                    width={12}
                    height={12}
                    color={filters.showServedTickets ? 'white3' : 'primary'}
                    disabled
                  />
                ) : (
                  <Icons.ChevronUpIcon
                    width={12}
                    height={12}
                    color={filters.showServedTickets ? 'white3' : 'primary'}
                    disabled
                  />
                )}
                <Typography
                  variant="tip"
                  color={filters.showServedTickets ? 'white3' : 'primary'}>
                  {'barber.onQueue.filters.oldTickets'}
                </Typography>
              </OnQueueFilterOldTicketsStyled>
            }
          </OnQueueFiltersStyled>
        )}
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
