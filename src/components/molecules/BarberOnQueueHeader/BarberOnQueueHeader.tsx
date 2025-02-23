import {IQueue, TOnQueueViewModes} from '@/app/models';
import {Icons, Typography} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {QueueActions, QueueThunks} from '@/store/slicers';
import {TColorsType} from '@/theme';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  OnQueueFilterOldTicketsStyled,
  OnQueueFiltersStyled,
  OnQueueHeaderActionsStyled,
  OnQueueHeaderContainerStyled,
  OnQueueHeaderRowStyled,
  OnQueueHeaderStyled,
  OnQueueTitleDotStyled,
  OnQueueTitleGroupStyled,
  OnQueueTitleStyled,
} from './styles';

export const QUEUE_STATUS_COLOR: Record<IQueue['status'], TColorsType> = {
  on: 'success',
  paused: 'default',
  off: 'danger',
};

const BarberOnQueueHeader = () => {
  const {t} = useTranslation();
  const {todayQueue, filters, viewMode} = useSelector(
    (state: RootState) => state.queue,
  );

  const dispatch = useDispatch<AppDispatch>();
  const iconFlipValue = useSharedValue(0);

  const flipStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateX: `${iconFlipValue.value * 180}deg`}],
    };
  });

  const titleColor: TColorsType = useMemo(() => {
    if (!todayQueue) {
      return 'placeholder';
    }

    if (todayQueue.status === 'on') {
      return 'success';
    }

    if (todayQueue.status === 'paused') {
      return 'default';
    }

    return 'danger';
  }, [todayQueue]);

  const applyOldTicketsFilter = () => {
    const applyFilter = !filters?.showServedTickets;

    iconFlipValue.value = withSpring(applyFilter ? 1 : 0);

    dispatch(
      QueueActions.setFilters({showServedTickets: !filters?.showServedTickets}),
    );
  };

  const setFullscreenViewMode = async () => {
    const newViewMode: TOnQueueViewModes = viewMode === 'fs' ? 'fs-out' : 'fs';

    await dispatch(QueueThunks.persistViewMode(newViewMode));
  };

  const onRefresh = async () => {
    await dispatch(QueueThunks.fetchBarberTodayQueue());
  };

  if (!todayQueue) {
    return null;
  }

  return (
    <OnQueueHeaderContainerStyled as={Animated.View}>
      <OnQueueHeaderStyled>
        <OnQueueHeaderRowStyled>
          <OnQueueTitleGroupStyled>
            <OnQueueTitleDotStyled as={Animated.View} color={titleColor} />
            <OnQueueTitleStyled color={titleColor} variant="h5">
              {`barber.onQueue.titles.${todayQueue.status}`}
            </OnQueueTitleStyled>
          </OnQueueTitleGroupStyled>

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
          <OnQueueFilterOldTicketsStyled
            active={filters.showServedTickets}
            onPress={applyOldTicketsFilter}>
            <Icons.ChevronDownIcon
              width={14}
              height={14}
              strokeWidth={2.5}
              color={filters.showServedTickets ? 'white3' : 'black2'}
              disabled
              wrapperStyle={flipStyle}
            />
            <Typography
              variant="caption"
              weight="medium"
              color={filters.showServedTickets ? 'white3' : 'black2'}>
              {'barber.onQueue.filters.oldTickets'}
            </Typography>
          </OnQueueFilterOldTicketsStyled>
        </OnQueueFiltersStyled>
      )}
    </OnQueueHeaderContainerStyled>
  );
};

export {BarberOnQueueHeader};
