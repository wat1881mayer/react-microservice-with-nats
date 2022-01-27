import { Subjects, Publisher, PaymentCreatedEvent } from '@wattickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
