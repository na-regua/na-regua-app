import {ITicket} from '@/app/models';
import React from 'react';
import {ToApprove} from '../ToApprove/ToApprove';

interface TicketHandlerProps extends ITicket {}

const TicketHandler: React.FC<TicketHandlerProps> = ticket => {
  return <>{ticket.status === 'pending' && <ToApprove {...ticket} />}</>;
};

export {TicketHandler};
