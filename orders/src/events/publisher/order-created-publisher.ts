import { Publisher, OrderCreatedEvent, Subjects } from '@wattickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
