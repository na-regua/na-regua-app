import {AppStatusBar, Button, Carousel} from '@/components/atoms';
import {
  Header,
  QueueCarouselBillingItem,
  QueueCarouselNotificationsItem,
  QueueCarouselQRItem,
} from '@/components/molecules';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {QueueContainerStyled, QueueScrollContentStyled} from './styles';

const BarberQueue: React.FC = () => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <QueueContainerStyled style={insetsStyles}>
      <AppStatusBar />
      <Header showTitle={false} showBorder showWelcome />
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
        <Button title="Iniciar" />
      </QueueScrollContentStyled>
    </QueueContainerStyled>
  );
};

export default BarberQueue;
