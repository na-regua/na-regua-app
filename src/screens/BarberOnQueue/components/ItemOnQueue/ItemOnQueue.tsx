import {QueueService} from '@/app/api';
import {ITicket} from '@/app/models';
import {
  Box,
  Icons,
  MenuItem,
  MenuItemAction,
  Typography,
} from '@/components/atoms';
import {AppDispatch, RootState} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';
import React, {useMemo, useState} from 'react';
import {FadeInRight} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

const ItemTicketOnQueue: React.FC<
  ITicket & {
    scrollViewWidth: number;
  }
> = ({
  _id,
  customer,
  service,
  additional_services,
  scrollViewWidth,
  queue: ticketQueue,
}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [actionsWidth, setActionsWidth] = useState<number>(42);
  const [actionsHeight, setActionsHeight] = useState<number>(58);
  const {todayQueue} = useSelector((state: RootState) => state.queue);
  const [missing, setMissing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const services = useMemo(
    () =>
      `${service.name}${
        additional_services ? additional_services.map(s => ' + ' + s.name) : ''
      }`,
    [service, additional_services],
  );

  const ticketPosition = useMemo(() => {
    const ticketPositionValue = ticketQueue?.position || 0;
    const queuePositionValue = todayQueue?.current_position || 0;

    if (queuePositionValue > ticketPositionValue) {
      return ticketPositionValue;
    }

    return ticketPositionValue + 1 - queuePositionValue;
  }, [ticketQueue, todayQueue]);

  const PositionJSX = (
    <Box paddings={{right: 6}}>
      <Typography variant="h4" color="black2">
        {ticketPosition}º
      </Typography>
    </Box>
  );

  const missTicket = async () => {
    try {
      setMissing(true);

      await QueueService.missTicket(_id);

      setMissing(false);
    } catch (error) {
      setMissing(false);
      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'missing_ticket',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  return (
    <Box
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width={scrollViewWidth}
      onLayout={e => {
        setActionsHeight(e.nativeEvent.layout.height);
      }}>
      <MenuItem
        avatar={customer.avatar.url}
        title={customer.name}
        description={services}
        width={scrollViewWidth}
        actionsWidth={actionsWidth}
        clickable
        onPress={() => setExpand(curr => !curr)}
        collapsed={expand}
        suffix={PositionJSX}
      />
      {expand && (
        <Box
          alignItems="center"
          justifyContent="center"
          onLayout={e => {
            setActionsWidth(e.nativeEvent.layout.width);
          }}
          height={actionsHeight}
          entering={FadeInRight}>
          <MenuItemAction theme="danger" loading={missing} onPress={missTicket}>
            <Icons.DeleteIcon color="white3" />
          </MenuItemAction>
        </Box>
      )}
    </Box>
  );
};

export {ItemTicketOnQueue};
