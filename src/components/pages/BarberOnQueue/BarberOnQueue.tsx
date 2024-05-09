import React, {useCallback, useEffect, useMemo} from 'react';

import {SocketUrls} from '@/app/models';
import {AppStatusBar, Button, Loader, MenuItem} from '@/components/atoms';
import {Header, OnQueueHeader} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {BarberQueueSocketEvents} from '@/socket/events';
import {AppDispatch, RootState} from '@/store/Store';
import {fetchPersistedViewMode} from '@/store/slicers';
import {Colors} from '@/theme';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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

  if (!todayQueue) {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/barber/queue');
    }

    return null;
  }

  return (
    <OnQueueContainerStyled insets={insets}>
      {socket && <BarberQueueSocketEvents />}
      {!isFs && (
        <>
          <AppStatusBar />
          <Header showTitle={false} showBorder showWelcome />
        </>
      )}
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
          <Button
            title="barber.onQueue.buttons.next"
            colorScheme="primary"
            disabled={todayQueue.status === 'paused'}
          />
        </OnQueueActionsStyled>
      </OnQueueContentStyled>
    </OnQueueContainerStyled>
  );
};

export {BarberOnQueue};
