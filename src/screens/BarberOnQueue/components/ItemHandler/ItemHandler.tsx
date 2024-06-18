import {ITicket} from '@/app/models';
import React from 'react';
import {ItemTicketOnQueue} from '../ItemOnQueue/ItemOnQueue';
import {ItemToApprove} from '../ItemToApprove/ItemToApprove';

interface ItemHandlerProps extends ITicket {
  scrollViewWidth: number;
}

const ItemHandler: React.FC<ItemHandlerProps> = ({
  scrollViewWidth,
  ...ticket
}) => {
  return (
    <>
      {ticket.status === 'pending' && <ItemToApprove {...ticket} />}
      {ticket.status === 'queue' && (
        <ItemTicketOnQueue scrollViewWidth={scrollViewWidth} {...ticket} />
      )}
    </>
  );
};

export {ItemHandler};
