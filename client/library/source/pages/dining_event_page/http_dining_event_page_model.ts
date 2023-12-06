import { DiningEvent } from '../../definitions';
import { DiningEventCheckoutModel, HttpDiningEventCheckoutModel } from
  '../../modals/dining_event_checkout_modal';
import { DiningEventPageModel } from './dining_event_page_model';
import { EmptyDiningEventPageModel } from './empty_dining_event_page_model';
import { LocalDiningEventPageModel } from './local_dining_event_page_model';

export class HttpDiningEventPageModel extends DiningEventPageModel {
  constructor(eventId: number) {
    super();
    this._isLoaded = false;
    this._eventId = eventId;
    this._model = new EmptyDiningEventPageModel();
  }

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(`/api/dining_events/${this._eventId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const diningEvent = DiningEvent.fromJson(responseObject.diningEvent);
    const checkoutModel = new HttpDiningEventCheckoutModel(this._eventId);
    this._model = new LocalDiningEventPageModel(diningEvent, checkoutModel);
    await this._model.load();
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    return this._model.diningEvent;
  }

  public getCheckoutModel(): DiningEventCheckoutModel {
    return this._model.getCheckoutModel();
  }

  public async removeSeat(): Promise<void> {
    const response = await fetch(
      `/api/dining_events/${this._eventId}/remove_seat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this._checkResponse(response);
    const responseObject = await response.json();
    await this._model.removeSeat(parseInt(responseObject.accountId),
      responseObject.accountName, responseObject.profileImageSrc);
  }

  public async validatePaymentAndJoinEvent(): Promise<void> {
    try {
      const response = await fetch(`/api/validate_and_join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId: this._eventId,
        })
      });
      this._checkResponse(response);
      const data = await response.json();
      if (data.success) {
        await this._model.getCheckoutModel().joinEvent(data.accountId,
          data.name, data.profileImageSrc);
        await this._model.validatePaymentAndJoinEvent(parseInt(data.accountId));
      }
    } catch (error) {
      console.error('Error during validation:', error);
    }
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private _isLoaded: boolean;
  private _eventId: number;
  private _model: DiningEventPageModel;
}
