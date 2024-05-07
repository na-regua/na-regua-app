import {AppStatusBar, Button, Carousel} from '@/components/atoms';
import {
  Header,
  QueueCarouselBillingItem,
  QueueCarouselNotificationsItem,
  QueueCarouselQRItem,
} from '@/components/molecules';
import {BarberOnQueue} from '@/components/pages';
import {AppDispatch, RootState} from '@/store/Store';
import {fetchIsOnQueue} from '@/store/slicers';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {QueueContainerStyled, QueueScrollContentStyled} from './styles';

const BarberQueue: React.FC = () => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const dispatch = useDispatch<AppDispatch>();
  const {loadingTodayQueue, workerOnQueue} = useSelector(
    (state: RootState) => state.queue,
  );

  useEffect(() => {
    dispatch(fetchIsOnQueue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueueContainerStyled style={insetsStyles}>
      <AppStatusBar />
      <Header showTitle={false} showBorder showWelcome />
      <QueueScrollContentStyled>
        {!workerOnQueue && (
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
            <Button title="Iniciar" loading={loadingTodayQueue} />
          </>
        )}
        {workerOnQueue && <BarberOnQueue />}
      </QueueScrollContentStyled>
    </QueueContainerStyled>
  );
};

export default BarberQueue;
