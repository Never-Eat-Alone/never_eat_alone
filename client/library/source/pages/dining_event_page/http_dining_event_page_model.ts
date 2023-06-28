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
    if (response.status !== 200) {
      throw new Error(`Response status ${response.status}`);
    }
    const responseObject = await response.json();
    const diningEvent = DiningEvent.fromJson(responseObject.diningEvent);
    const isGoing = responseObject.isGoing;
    this._model = new LocalDiningEventPageModel(diningEvent, isGoing);
    await this._model.load();
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
  private _model: DiningEventPageModel;
}
