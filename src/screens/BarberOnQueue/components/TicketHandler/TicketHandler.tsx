import {ITicket} from '@/app/models';
import React from 'react';
import {ItemToApprove} from '../ItemToApprove/ItemToApprove';
import {ItemTicketOnQueue} from '../ItemOnQueue/ItemOnQueue';

interface TicketHandlerProps extends ITicket {
  scrollViewWidth: number;
}

const TicketHandler: React.FC<TicketHandlerProps> = ({
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

export {TicketHandler};
