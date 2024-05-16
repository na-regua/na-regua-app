import {QueueService} from '@/app/api';
import {AppStatusBar, Button, Carousel, Modal} from '@/components/atoms';
import {JoinQueueModal} from '@/components/modals';
import {
  Header,
  QueueCarouselBillingItem,
  QueueCarouselNotificationsItem,
  QueueCarouselQRItem,
} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  fetchIsOnQueue,
  setLoadingTodayQueue,
  updateQueueData,
  workerJoinQueue,
} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {QueueContainerStyled, QueueScrollContentStyled} from './styles';

const BarberQueue: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/queue'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
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

  const handleStartQueue = () => {
    if (todayQueue) {
      showJoinQueueModal();
    }

    if (!todayQueue) {
      startAndJoinQueue();
    }
  };

  const startAndJoinQueue = async () => {
    try {
      dispatch(setLoadingTodayQueue(true));

      const {data} = await QueueService.startQueue();

      console.log(data);

      if (data.queue) {
        dispatch(updateQueueData(data.queue));
        dispatch(workerJoinQueue());

        dispatch(setLoadingTodayQueue(false));

        navigation.navigate('/barber/queue/fs');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showJoinQueueModal = () => {
    joinQueueModalRef.current?.present();
  };

  useEffect(() => {
    dispatch(fetchIsOnQueue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueueContainerStyled style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.Actions />
        <Header.Welcome />
        <Header.Border />
      </Header.Container>
      <QueueScrollContentStyled>
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
      </QueueScrollContentStyled>
      <Modal
        ref={joinQueueModalRef}
        title="modals.joinQueue.title"
        height={200}>
        <JoinQueueModal
          dismiss={joinQueueModalRef.current?.dismiss}
          navigate={route => {
            navigation.navigate(route as any);
          }}
        />
      </Modal>
    </QueueContainerStyled>
  );
};

export default BarberQueue;
