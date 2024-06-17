import {ITicket} from '@/app/models';
import {
  Box,
  Icons,
  MenuItem,
  MenuItemAction,
  Typography,
} from '@/components/atoms';
import {RootState} from '@/store/Store';
import React, {useMemo, useState} from 'react';
import {FadeInRight} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

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
          <MenuItemAction theme="danger">
            <Icons.DeleteIcon color="white3" />
          </MenuItemAction>
        </Box>
      )}
    </Box>
  );
};

export {ItemTicketOnQueue};
