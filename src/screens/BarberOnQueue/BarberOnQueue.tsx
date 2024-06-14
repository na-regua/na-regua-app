import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {SocketUrls} from '@/app/models';
import {
  AppStatusBar,
  Loader,
  SwipeButton,
  SwipeButtonState,
} from '@/components/atoms';
import {Header, OnQueueHeader} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {BarberQueueSocketEvents} from '@/socket/events';
import {AppDispatch, RootState} from '@/store/Store';
import {QueueThunks, createNotification} from '@/store/slicers';
import {Colors, Metrics} from '@/theme';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {TicketHandler} from './components';
import {
  OnQueueActionsRowStyled,
  OnQueueActionsStyled,
  OnQueueButtonStyled,
  OnQueueContainerStyled,
  OnQueueContentStyled,
  OnQueueLoaderWrapperStyled,
  OnQueueScrollStyled,
} from './styles';
import {QueueService} from '@/app/api';
import {AxiosError} from 'axios';

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

  const [swiping, setSwiping] = useState<SwipeButtonState>('wait');
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

  const pauseQueue = () => {
    if (socket) {
      socket.emit(SocketUrls.WorkerPauseQueue);
    }
  };

  const resumeQueue = () => {
    if (socket) {
      socket.emit(SocketUrls.WorkerResumeQueue);
    }
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/barber/queue');
    }
  };

  if (!todayQueue) {
    goBack();

    return null;
  }

  const onNext = async (toggled: boolean) => {
    if (toggled) {
      try {
        setSwiping('on');

        await QueueService.goNextTicket();

        setSwiping('off');

        setTimeout(() => {
          setSwiping('wait');
        });
      } catch (error) {
        setSwiping('off');

        setTimeout(() => {
          setSwiping('wait');
        });

        if (error instanceof AxiosError) {
          const {message} = error.response?.data;

          if (message) {
            dispatch(
              createNotification({
                id: 'go_next',
                type: 'error',
                message: `errors.${message}`,
              }),
            );
          }
        }
      }
    }
  };

  const SocketEvents = <>{socket && <BarberQueueSocketEvents />}</>;

  return (
    <OnQueueContainerStyled insets={insets}>
      {SocketEvents}
      {!isFs && (
        <>
          <AppStatusBar />
          <Header.Container>
            <Header.GoBack pressables={{back: goBack}} />
            <Header.Border />
          </Header.Container>
        </>
      )}
      <OnQueueContentStyled fs={isFs}>
        <OnQueueHeader />
        <OnQueueScrollStyled
          showsVerticalScrollIndicator={false}
          onLayout={e => {
            console.log(e.nativeEvent.layout.width);
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}>
          {!loadingTodayQueue &&
            todayQueue.tickets.map((ticket, index) => (
              <TicketHandler
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
        <OnQueueActionsStyled>
          <OnQueueActionsRowStyled>
            {todayQueue.status === 'on' && (
              <OnQueueButtonStyled
                title="barber.onQueue.buttons.pause"
                colorScheme="default"
                variant="outlined"
                onPress={pauseQueue}
              />
            )}
            {todayQueue.status === 'paused' && (
              <OnQueueButtonStyled
                title="barber.onQueue.buttons.resume"
                colorScheme="success"
                onPress={resumeQueue}
              />
            )}
            <OnQueueButtonStyled
              title="barber.onQueue.buttons.finish"
              colorScheme="danger"
            />
          </OnQueueActionsRowStyled>
          <SwipeButton
            onToggle={value => {
              onNext(value);
            }}
            resetAfterLoading
            state={swiping}
            title="buttons.next"
          />
        </OnQueueActionsStyled>
      </OnQueueContentStyled>
    </OnQueueContainerStyled>
  );
};

export default BarberOnQueue;
