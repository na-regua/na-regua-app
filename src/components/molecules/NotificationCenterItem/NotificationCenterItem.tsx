import {NotificationService} from '@/app/api';
import {INotification} from '@/app/models';
import {Avatar, Typography} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {fetchUserNotifications} from '@/store/slicers';
import {format} from 'date-fns';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {NotificationInfoStyled, NotificationItemStyled} from './styles';

interface NotificationCenterItemProps extends INotification {}

const NotificationCenterItem: React.FC<NotificationCenterItemProps> = ({
  message,
  data,
  icon,
  createdAt,
  read,
  _id: notificationId,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [reading, setReading] = useState(read);

  const messageStr = useMemo(() => {
    if (message === 'GENERATED_STATEMENT' && data?.date) {
      return t(`notification.${message}`, {
        day: format(new Date(data.date), 'dd/MM/yy'),
      });
    }

    return t(`notification.${message}`, {data});
  }, [data, message, t]);

  const formattedCreatedAt = useMemo(() => {
    const today = new Date();

    const date = new Date(createdAt);

    if (today.getDate() === date.getDate()) {
      return format(date, 'HH:mm');
    }

    return format(date, 'dd/MM/yyyy');
  }, [createdAt]);

  const markAsRead = async () => {
    try {
      setReading(true);

      await NotificationService.markAsReadById(notificationId);

      await dispatch(fetchUserNotifications({reload: false}));

      setReading(false);
    } catch (error) {
      setReading(false);
    }
  };

  return (
    <NotificationItemStyled
      onPress={markAsRead}
      disabled={read || reading}
      read={read}>
      <Avatar
        disabled
        preview={icon?.url}
        showBorder={false}
        borderOffset={0}
        size={42}
      />
      <NotificationInfoStyled>
        <Typography variant="body2">{messageStr}</Typography>
        {data?.service && (
          <Typography variant="caption" color="primary" weight="medium">
            {data.service.name}
          </Typography>
        )}
        <Typography translate={false} variant="tip" color="default">
          {formattedCreatedAt}
        </Typography>
      </NotificationInfoStyled>
    </NotificationItemStyled>
  );
};

export {NotificationCenterItem};
