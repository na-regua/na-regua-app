import {QueueService} from '@/app/api';
import {IQueue} from '@/app/models';
import {Box, Button, Icons, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {QueueActions} from '@/store/slicers';
import React, {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  BQPAvatarImage,
  BQPContainerStyled,
  BQPDotStyled,
  BQPHasMoreAvatars,
  BQPWrappingRow,
} from './styles';
import {QUEUE_STATUS_COLOR} from '../BarberOnQueueHeader/BarberOnQueueHeader';

interface BarberQueuePreviewProps {
  queue: IQueue;
}

const BarberQueuePreview: React.FC<BarberQueuePreviewProps> = ({queue}) => {
  const [joining, setJoining] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const join = async () => {
    setJoining(true);

    const {data} = await QueueService.workerJoin();

    if (data.queue) {
      dispatch(QueueActions.updateQueueData(data.queue));

      navigation.navigate('/barber/queue/fs');
    }

    setJoining(false);
  };

  const SHOW_LIMIT = 12;

  const workerAvatars: string[] = useMemo(
    () => queue.workers.map(worker => worker.user.avatar.url),
    [queue],
  );

  const customerAvatars: string[] = useMemo(
    () =>
      queue.tickets
        .filter((_, index) => index <= SHOW_LIMIT)
        .map(ticket => ticket.customer.avatar.url),
    [queue.tickets],
  );

  const hasMore = useMemo(
    () => true || queue.tickets.length > SHOW_LIMIT,
    [queue.tickets],
  );
  const isEmpty = useMemo(() => queue.tickets.length === 0, [queue.tickets]);

  const statusColor = useMemo(
    () => QUEUE_STATUS_COLOR[queue.status],
    [queue.status],
  );

  return (
    <BQPContainerStyled>
      <Box direction="row" alignItems="center" gap={6}>
        <BQPDotStyled color={statusColor} />
        <Typography variant="h5" color={statusColor}>
          {'barber.queue.status.' + queue.status}
        </Typography>
      </Box>
      <Box gap={6}>
        <Typography variant="body1" color="white2">
          {'barber.queue.preview.labels.workers'}
        </Typography>
        <BQPWrappingRow>
          {workerAvatars.map((avatar, index) => (
            <BQPAvatarImage source={avatar} key={index} />
          ))}
        </BQPWrappingRow>
      </Box>
      <Box gap={6} alignSelf="stretch" width={'100%'}>
        <Typography variant="body1" color="white2">
          {'barber.queue.preview.labels.customers'}
        </Typography>
        <Box direction="row" justifyContent="space-between" alignSelf="stretch">
          <Typography
            variant="caption"
            color="white1"
            translateProps={{
              total: queue.tickets.length,
            }}>
            {'barber.queue.preview.labels.total'}
          </Typography>
          <Typography
            variant="caption"
            color="white1"
            translateProps={{
              total: queue.serveds.length,
            }}>
            {'barber.queue.preview.labels.served'}
          </Typography>
        </Box>
        <BQPWrappingRow>
          {customerAvatars.map((avatar, index) => (
            <BQPAvatarImage source={avatar} key={index} />
          ))}
          {hasMore && (
            <BQPHasMoreAvatars>
              {!isEmpty && <Icons.DotsHorizontalIcon color="default" />}
              {isEmpty && (
                <Icons.UserIcon
                  width={22}
                  height={22}
                  strokeWidth={3}
                  color="default"
                />
              )}
            </BQPHasMoreAvatars>
          )}
        </BQPWrappingRow>
      </Box>
      <Box gap={12} direction="row">
        <Button
          size="small"
          title="barber.queue.preview.buttons.finish"
          colorScheme="danger"
          variant="filled"
          fillSpace
        />
        <Button
          size="small"
          title="barber.queue.preview.buttons.join"
          colorScheme="white"
          fillSpace
          onPress={join}
          loading={joining}
          textColor="primary"
        />
      </Box>
    </BQPContainerStyled>
  );
};

export {BarberQueuePreview};
