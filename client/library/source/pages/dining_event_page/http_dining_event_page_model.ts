import { DiningEvent } from '../../definitions';
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
    this._model = new LocalDiningEventPageModel(diningEvent);
    await this._model.load();
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    return this._model.diningEvent;
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
    await this._model.joinEvent(responseObject.accountId,
      responseObject.accountName, responseObject.profileImageSrc);
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
    await this._model.removeSeat(responseObject.accountId,
      responseObject.accountName, responseObject.profileImageSrc);
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
