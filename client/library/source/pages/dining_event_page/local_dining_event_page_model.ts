import { DiningEvent, User } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(diningEvent: DiningEvent, isGoing: boolean) {
    super();
    this._isLoaded = false;
    this._diningEvent = diningEvent;
    this._isGoing = isGoing;
  }

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public get isGoing(): boolean {
    this.ensureIsLoaded();
    return this._isGoing;
  }

  public async joinEvent(account: User, profileImageSrc: string): Promise<
      boolean> {
    return Boolean(account && profileImageSrc);
  }

  public async removeSeat(account: User): Promise<boolean> {
    return Boolean(account);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: DiningEvent;
  private _isGoing: boolean;
}
