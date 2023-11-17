import { DiningEvent, PaymentCard } from '../../definitions';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';

export class LocalDiningEventCheckoutModel extends DiningEventCheckoutModel {
  constructor(diningEvent: DiningEvent, paymentCardList: PaymentCard[]) {
    super();
    this._isLoaded = false;
    this._diningEvent = diningEvent;
    this._paymentCardList = paymentCardList;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public get paymentCardList(): PaymentCard[] {
    this.ensureIsLoaded();
    return this._paymentCardList;
  }

  public async checkout(): Promise<void> {
    this.ensureIsLoaded();
  }

  public async addCard(): Promise<void> {
    this.ensureIsLoaded();
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('SettingsPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: DiningEvent;
  private _paymentCardList: PaymentCard[];
}
