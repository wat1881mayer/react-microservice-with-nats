import { Publisher, OrderCancelledEvent, Subjects } from '@wattickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
