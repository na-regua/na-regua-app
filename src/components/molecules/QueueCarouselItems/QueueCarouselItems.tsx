import {Typography} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {BillingSVG, NotificationsSVG, QRCodeSVG} from './SVG';
import {
  QueueCarouselItemLabelWrapperStyled,
  QueueCarouselItemSVGWrapperStyled,
  QueueCarouselItemStyled,
  QueueCarouselItemTextWrapperStyled,
} from './styles';

export const QueueCarouselQRItem = () => {
  const {t} = useTranslation();

  return (
    <QueueCarouselItemStyled>
      <QueueCarouselItemSVGWrapperStyled>
        <QRCodeSVG />
      </QueueCarouselItemSVGWrapperStyled>
      <QueueCarouselItemTextWrapperStyled>
        <Typography variant="h4" color="black3" textAlign="center">
          {t('barber.queue.carousel.qr.title1')} {'\n'}
          {t('barber.queue.carousel.qr.title2')}
        </Typography>
        <QueueCarouselItemLabelWrapperStyled>
          <Typography variant="body2" color="black1" textAlign="center">
            {t('barber.queue.carousel.qr.subtitle')}
          </Typography>
        </QueueCarouselItemLabelWrapperStyled>
      </QueueCarouselItemTextWrapperStyled>
    </QueueCarouselItemStyled>
  );
};

export const QueueCarouselNotificationsItem = () => {
  const {t} = useTranslation();

  return (
    <QueueCarouselItemStyled>
      <QueueCarouselItemSVGWrapperStyled>
        <NotificationsSVG />
      </QueueCarouselItemSVGWrapperStyled>
      <QueueCarouselItemTextWrapperStyled>
        <Typography variant="h4" color="black3" textAlign="center">
          {t('barber.queue.carousel.qr.title1')} {'\n'}
          {t('barber.queue.carousel.qr.title2')}
        </Typography>
        <QueueCarouselItemLabelWrapperStyled>
          <Typography variant="body2" color="black1" textAlign="center">
            {t('barber.queue.carousel.notifications.subtitle')}
          </Typography>
        </QueueCarouselItemLabelWrapperStyled>
      </QueueCarouselItemTextWrapperStyled>
    </QueueCarouselItemStyled>
  );
};

export const QueueCarouselBillingItem = () => {
  const {t} = useTranslation();

  return (
    <QueueCarouselItemStyled>
      <QueueCarouselItemSVGWrapperStyled>
        <BillingSVG />
      </QueueCarouselItemSVGWrapperStyled>
      <QueueCarouselItemTextWrapperStyled>
        <Typography variant="h4" color="black3" textAlign="center">
          {t('barber.queue.carousel.billing.title1')} {'\n'}
          {t('barber.queue.carousel.billing.title2')}
        </Typography>
        <QueueCarouselItemLabelWrapperStyled>
          <Typography variant="body2" color="black1" textAlign="center">
            {t('barber.queue.carousel.billing.subtitle')}
          </Typography>
        </QueueCarouselItemLabelWrapperStyled>
      </QueueCarouselItemTextWrapperStyled>
    </QueueCarouselItemStyled>
  );
};
