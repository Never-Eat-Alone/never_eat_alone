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
    if (response.status !== 200) {
      throw new Error(`Response status ${response.status}`);
    }
    const responseObject = await response.json();
    const diningEvent = DiningEvent.fromJson(responseObject.diningEvent);
    const isGoing = responseObject.isGoing;
    this._model = new LocalDiningEventPageModel(this._account,
      this._profileImageSrc, diningEvent, isGoing);
    await this._model.load(eventId);
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    return this._model.diningEvent;
  }

  public get isGoing(): boolean {
    return this._model.isGoing;
  }

  public async joinEvent(): Promise<boolean> {
    const response = await fetch(`/api/join_event/${this._eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async removeSeat(): Promise<boolean> {
    const response = await fetch(`/api/remove_seat/${this._eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  private _isLoaded: boolean;
  private _eventId: number;
  private _account: User;
  private _profileImageSrc: string;
  private _model: DiningEventPageModel;
}
