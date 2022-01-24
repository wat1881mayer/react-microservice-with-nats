import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@wattickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
