import { Publisher, Subjects, TicketCreatedEvent } from '@wattickets/common';
import { natsWrapper } from '../../nats-wrapper';
import { TicketUpdatedPublisher } from './ticket-updated-publisher';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
