import { DiningEvent, PaymentCard, arrayFromJson } from '../../definitions';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';
import { LocalDiningEventCheckoutModel } from
  './local_dining_event_checkout_model';

export class HttpDiningEventCheckoutModel extends DiningEventCheckoutModel {
  public async load(): Promise<void> {
    const response = await fetch('/api/checkout_dining_event/:eventId');
    this._checkResponse(response);
    const responseObject = await response.json();
    const diningEvent = DiningEvent.fromJson(responseObject.diningEvent);
    const paymentCardList: PaymentCard[] = arrayFromJson(PaymentCard,
      responseObject.paymentCardList);
    this._model = new LocalDiningEventCheckoutModel(diningEvent,
      paymentCardList);
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    return this._model.diningEvent;
  }

  public get paymentCardList(): PaymentCard[] {
    return this._model.paymentCardList;
  }

  public async checkout(): Promise<void> {
    await this._model.checkout();
  }

  public async addCard(): Promise<void> {
    await this._model.addCard();
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      const error = new Error(`HTTP error, status = ${response.status}`) as any;
      error.code = response.status;
      throw error;
    }
  }

  private _isLoaded: boolean;
  private _model: DiningEventCheckoutModel;
}
