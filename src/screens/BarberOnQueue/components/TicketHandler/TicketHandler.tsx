import {ITicket} from '@/app/models';
import React from 'react';
import {ToApprove} from '../ToApprove/ToApprove';
import {TicketOnQueue} from '../TicketOnQueue/TicketOnQueue';

interface TicketHandlerProps extends ITicket {
  scrollViewWidth: number;
}

const TicketHandler: React.FC<TicketHandlerProps> = ({
  scrollViewWidth,
  ...ticket
}) => {
  return (
    <>
      {ticket.status === 'pending' && <ToApprove {...ticket} />}
      {ticket.status === 'queue' && (
        <TicketOnQueue scrollViewWidth={scrollViewWidth} {...ticket} />
      )}
    </>
  );
};

export {TicketHandler};
