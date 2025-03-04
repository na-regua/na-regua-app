import {QueueService} from '@/app/api';
import {AppStatusBar, Button, Carousel, Typography} from '@/components/atoms';
import {
  BarberQueuePreview,
  Header,
  QueueCarouselBillingItem,
  QueueCarouselNotificationsItem,
  QueueCarouselQRItem,
} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {QueueActions, QueueThunks} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {QueueContainerStyled, QueueScrollContentStyled} from './styles';

const BarberQueue: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/queue'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const isScreenFocused = useIsFocused();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const dispatch = useDispatch<AppDispatch>();
  const {loadingTodayQueue, todayQueue} = useSelector(
    (state: RootState) => state.queue,
  );

  const joinQueueModalRef = useRef<BottomSheetModal>(null);

  const handleStartQueue = async () => {
    await dispatch(QueueThunks.fetchBarberTodayQueue());

    if (todayQueue) {
      showJoinQueueModal();
    }

    if (!todayQueue) {
      startAndJoinQueue();
    }
  };

  const startAndJoinQueue = async () => {
    try {
      dispatch(QueueActions.setLoadingTodayQueue(true));

      const {data} = await QueueService.startQueue();

      if (data.queue) {
        dispatch(QueueActions.updateQueueData(data.queue));

        dispatch(QueueActions.setLoadingTodayQueue(false));

        navigation.navigate('/barber/queue/fs');
      }
    } catch (error) {
      dispatch(QueueActions.setLoadingTodayQueue(false));
    }
  };

  const showJoinQueueModal = () => {
    joinQueueModalRef.current?.present();
  };

  useEffect(() => {
    dispatch(QueueThunks.fetchBarberTodayQueue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenFocused]);

  return (
    <QueueContainerStyled style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.Actions />
        <Header.Welcome />
        <Header.Border />
      </Header.Container>
      <QueueScrollContentStyled>
        {!todayQueue && (
          <>
            <Carousel
              items={[
                {
                  element: <QueueCarouselQRItem />,
                },
                {
                  element: <QueueCarouselNotificationsItem />,
                },
                {
                  element: <QueueCarouselBillingItem />,
                },
              ]}
            />

            <Button
              title="barber.queue.buttons.start"
              loading={loadingTodayQueue}
              onPress={handleStartQueue}
            />
          </>
        )}
        {!!todayQueue && (
          <>
            <Typography variant="h4" color="black2">
              {'barber.queue.preview.title'}
            </Typography>
            <BarberQueuePreview queue={todayQueue} />
          </>
        )}
      </QueueScrollContentStyled>
      {/* <Modal
        ref={joinQueueModalRef}
        title="modals.joinQueue.title"
        height={194 + Metrics.platformPadding}>
        <WorkerJoinQueueModal
          dismiss={joinQueueModalRef.current?.dismiss}
          navigate={route => {
            navigation.navigate(route as any);
          }}
        />
      </Modal> */}
    </QueueContainerStyled>
  );
};

export default BarberQueue;
