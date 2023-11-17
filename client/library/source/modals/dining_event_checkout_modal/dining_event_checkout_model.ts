import { DiningEvent, PaymentCard } from '../../definitions';

export abstract class DiningEventCheckoutModel {
  public abstract load(): Promise<void>;
  public abstract get diningEvent(): DiningEvent;
  public abstract get paymentCardList(): PaymentCard[];
  public abstract checkout(): Promise<void>;
  public abstract addCard(): Promise<void>;
}
