import { DiningEvent, PaymentCard } from '../../definitions';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';

export class EmptyDiningEventCheckoutModel extends DiningEventCheckoutModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get diningEvent(): DiningEvent {
    throw new Error('EmptyDiningEventCheckoutModel not loaded.');
  }

  public get paymentCardList(): PaymentCard[] {
    throw new Error('EmptyDiningEventCheckoutModel not loaded.');
  }

  public async checkout(): Promise<void> {
    throw new Error('EmptyDiningEventCheckoutModel not loaded.');
  }

  public async addCard(): Promise<void> {
    throw new Error('EmptyDiningEventCheckoutModel not loaded.');
  }
}
