import {ITicket} from '@/app/models';
import {Box, Icons, MenuItem, MenuItemAction} from '@/components/atoms';
import React, {useEffect, useMemo, useState} from 'react';
import {FadeInRight} from 'react-native-reanimated';

const TicketOnQueue: React.FC<
  ITicket & {
    scrollViewWidth: number;
  }
> = ({_id, customer, service, additional_services, scrollViewWidth}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [actionsWidth, setActionsWidth] = useState<number>(42);
  const [actionsHeight, setActionsHeight] = useState<number>(58);

  const services = useMemo(
    () =>
      `${service.name}${
        additional_services ? additional_services.map(s => ' + ' + s.name) : ''
      }`,
    [service, additional_services],
  );

  useEffect(() => {
    console.log('scrollViewWidth', scrollViewWidth);
  }, [scrollViewWidth]);

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
      />
      {expand && (
        <Box
          alignItems="center"
          justifyContent="center"
          onLayout={e => {
            console.log('actionsWidth', e.nativeEvent.layout.width);
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

export {TicketOnQueue};
