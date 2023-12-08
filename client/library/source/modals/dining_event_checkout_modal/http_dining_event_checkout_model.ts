import { loadStripe, Stripe  } from '@stripe/stripe-js';
import { DiningEvent, PaymentCard, arrayFromJson } from '../../definitions';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';
import { EmptyDiningEventCheckoutModel } from
  './empty_dining_event_checkout_model';
import { LocalDiningEventCheckoutModel } from
  './local_dining_event_checkout_model';

export class HttpDiningEventCheckoutModel extends DiningEventCheckoutModel {
  constructor(eventId: number) {
    super();
    this._isLoaded = false;
    this._eventId = eventId;
    this._model = new EmptyDiningEventCheckoutModel();
    this._stripe = null;
  }

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(`/api/checkout_dining_event/${this._eventId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const diningEvent = DiningEvent.fromJson(responseObject.diningEvent);
    const paymentCardList: PaymentCard[] = arrayFromJson(PaymentCard,
      responseObject.paymentCardList);
    const defaultPaymentCard = PaymentCard.fromJson(
      responseObject.defaultPaymentCard);
    this._model = new LocalDiningEventCheckoutModel(diningEvent,
      paymentCardList, defaultPaymentCard);
    const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';
    const stripeTestPromise: Promise<Stripe | null> = loadStripe(
      STRIPE_TEST_PUBLIC_KEY);
    this._stripe = await stripeTestPromise;
    await this._model.load();
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    return this._model.diningEvent;
  }

  public get paymentCardList(): PaymentCard[] {
    return this._model.paymentCardList;
  }

  public get defaultPaymentCard(): PaymentCard {
    return this._model.defaultPaymentCard;
  }

  public async joinEvent(): Promise<void> {
    const response = await fetch(`/api/dining_events/${this._eventId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this._checkResponse(response);
    const responseObject = await response.json();
    await this._model.joinEvent(parseInt(responseObject.accountId),
      responseObject.accountName, responseObject.profileImageSrc);
  }

  public async checkout(): Promise<void> {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: 1,
          eventId: this._eventId
        })
      });
      this._checkResponse(response);
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }

    await this._model.checkout();
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      const error = new Error(`HTTP error, status = ${response.status}`) as any;
      error.code = response.status;
      throw error;
    }
  }

  private _isLoaded: boolean;
  private _eventId: number;
  private _model: DiningEventCheckoutModel;
  private _stripe: Stripe;
}
