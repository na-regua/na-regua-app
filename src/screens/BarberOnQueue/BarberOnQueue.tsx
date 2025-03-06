import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {AppStatusBar, Loader} from '@/components/atoms';
import {BarberOnQueueHeader, Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {BarberQueueSocketEvents} from '@/socket/events';
import {AppDispatch, RootState} from '@/store/Store';
import {QueueThunks, SocketActions} from '@/store/slicers';
import {Colors, Metrics} from '@/theme';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SlideOutUp} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ItemHandler, OnQueueActions} from './components';
import {
  OnQueueContainerStyled,
  OnQueueContentStyled,
  OnQueueLoaderWrapperStyled,
  OnQueueScrollStyled,
} from './styles';

const BarberOnQueue: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/queue/fs'>
> = ({navigation}) => {
  const {socket} = useSelector((state: RootState) => state.socket);
  const insets = useSafeAreaInsets();

  const route = useRoute();

  const {todayQueue, loadingTodayQueue} = useSelector(
    (state: RootState) => state.queue,
  );
  const dispatch = useDispatch<AppDispatch>();
  const {viewMode} = useSelector((state: RootState) => state.queue);

  const [scrollViewWidth, setScrollViewWidth] = useState<number>(
    Metrics.smWidth,
  );

  const isFs = useMemo(
    () => viewMode === 'fs' && route.name === '/barber/queue/fs',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewMode],
  );

  const getPersistedViewMode = useCallback(async () => {
    await dispatch(QueueThunks.fetchPersistedViewMode());
  }, [dispatch]);

  useEffect(() => {
    getPersistedViewMode();
  }, [getPersistedViewMode]);

  const onChangeFs = useCallback(() => {
    navigation.setParams({hideBottomNav: isFs});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  useEffect(() => {
    onChangeFs();
  }, [onChangeFs]);

  const goBack = () => {
    dispatch(SocketActions.clearSubs());

    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/barber/queue');
    }
  };

  // if (!todayQueue) {
  //   goBack();

  //   return null;
  // }

  const SocketEvents = <>{socket && <BarberQueueSocketEvents />}</>;

  return (
    <OnQueueContainerStyled insets={insets}>
      {SocketEvents}
      {!isFs && (
        <>
          <AppStatusBar />
          <Header.Container exiting={SlideOutUp}>
            <Header.GoBack pressables={{back: goBack}} />
            <Header.Border />
          </Header.Container>
        </>
      )}
      <OnQueueContentStyled fs={isFs}>
        <BarberOnQueueHeader />
        <OnQueueScrollStyled
          showsVerticalScrollIndicator={false}
          onLayout={e => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}>
          {!loadingTodayQueue &&
            todayQueue &&
            todayQueue.tickets.map((ticket, index) => (
              <ItemHandler
                scrollViewWidth={scrollViewWidth}
                key={index}
                {...ticket}
              />
            ))}
          {loadingTodayQueue && (
            <OnQueueLoaderWrapperStyled>
              <Loader size="128" color={Colors.primary} />
            </OnQueueLoaderWrapperStyled>
          )}
        </OnQueueScrollStyled>
        <OnQueueActions />
      </OnQueueContentStyled>
    </OnQueueContainerStyled>
  );
};

export default BarberOnQueue;
