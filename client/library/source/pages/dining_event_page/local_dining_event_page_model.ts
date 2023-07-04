import { DiningEvent, User } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(account: User, profileImageSrc: string, diningEvent: DiningEvent
      ) {
    super();
    this._isLoaded = false;
    this._account = account;
    this._profileImageSrc = profileImageSrc;
    this._diningEvent = diningEvent;
  }

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(eventId: number): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public async joinEvent(): Promise<void> {
    this.ensureIsLoaded();
    this.diningEvent.joinEvent(this._account.id, this._account.name,
      this._profileImageSrc);
  }

  public async removeSeat(): Promise<void> {
    this.ensureIsLoaded();
    this._diningEvent.removeSeat(this._account.id, this._account.userName,
      this._profileImageSrc);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _account: User;
  private _profileImageSrc: string;
  private _diningEvent: DiningEvent;
}
