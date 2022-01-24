import { Publisher, Subjects, TicketUpdatedEvent } from '@wattickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
