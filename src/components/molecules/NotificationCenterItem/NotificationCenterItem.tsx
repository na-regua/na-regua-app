import {INotification} from '@/app/models';
import {Avatar, Typography} from '@/components/atoms';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {NotificationInfoStyled, NotificationItemStyled} from './styles';
import {format} from 'date-fns';

interface NotificationCenterItemProps extends INotification {}

const NotificationCenterItem: React.FC<NotificationCenterItemProps> = ({
  message,
  data,
  icon,
  createdAt,
  read,
}) => {
  const {t} = useTranslation();

  const messageStr = useMemo(
    () => t(`notification.${message}`, {data}),
    [data, message, t],
  );

  const formattedCreatedAt = useMemo(() => {
    const today = new Date();

    const date = new Date(createdAt);

    if (today.getDate() === date.getDate()) {
      return format(date, 'HH:mm');
    }

    return format(date, 'dd/MM/yyyy');
  }, [createdAt]);

  return (
    <NotificationItemStyled read={read}>
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
