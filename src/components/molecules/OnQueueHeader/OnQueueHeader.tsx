import {TOnQueueViewModes} from '@/app/models';
import {Icons, Typography} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {fetchIsOnQueue, persistViewMode, setFilters} from '@/store/slicers';
import {TColorsType} from '@/theme/colors';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
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
  OnQueueTitleStyled,
  OnqueueTitleGroupStyled,
} from './styles';

const OnQueueHeader = () => {
  const {t} = useTranslation();
  const {todayQueue, filters, viewMode} = useSelector(
    (state: RootState) => state.queue,
  );

  const sv = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: sv.value,
  }));

  useEffect(() => {
    if (todayQueue?.status === 'on') {
      sv.value = withRepeat(withTiming(0, {duration: 1000}), -1);
    }

    if (todayQueue?.status === 'paused') {
      sv.value = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayQueue]);

  const dispatch = useDispatch<AppDispatch>();

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
    <OnQueueHeaderContainerStyled as={Animated.View}>
      <OnQueueHeaderStyled>
        <OnQueueHeaderRowStyled>
          <OnqueueTitleGroupStyled>
            <OnQueueTitleDotStyled
              as={Animated.View}
              style={[animatedStyle]}
              color={titleColor}
            />
            <OnQueueTitleStyled color={titleColor} variant="h5">
              {`barber.onQueue.titles.${todayQueue.status}`}
            </OnQueueTitleStyled>
          </OnqueueTitleGroupStyled>

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
    </OnQueueHeaderContainerStyled>
  );
};

export {OnQueueHeader};
