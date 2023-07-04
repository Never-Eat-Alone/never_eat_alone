import { DiningEvent, User } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';
import { EmptyDiningEventPageModel } from './empty_dining_event_page_model';
import { LocalDiningEventPageModel } from './local_dining_event_page_model';

export class HttpDiningEventPageModel extends DiningEventPageModel {
  constructor(account: User, profileImageSrc: string) {
    super();
    this._isLoaded = false;
    this._account = account;
    this._profileImageSrc = profileImageSrc;
    this._model = new EmptyDiningEventPageModel();
  }

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(eventId: number): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    this._eventId = eventId;
    const response = await fetch(`/api/dining_events/${eventId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const diningEvent = DiningEvent.fromJson(responseObject.diningEvent);
    this._model = new LocalDiningEventPageModel(this._account,
      this._profileImageSrc, diningEvent);
    await this._model.load(eventId);
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
    await this.load(this._eventId);
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
    await this.load(this._eventId);
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private _isLoaded: boolean;
  private _eventId: number;
  private _account: User;
  private _profileImageSrc: string;
  private _model: DiningEventPageModel;
}
