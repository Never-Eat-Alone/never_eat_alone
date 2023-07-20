import { DiningEvent } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(diningEvent: DiningEvent) {
    super();
    this._isLoaded = false;
    this._diningEvent = diningEvent;
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

  public async joinEvent(accountId: number, accountName: string,
      profileImageSrc: string): Promise<void> {
    this.ensureIsLoaded();
    this.diningEvent.joinEvent(accountId, accountName, profileImageSrc);
  }

  public async removeSeat(accountId: number, accountName: string,
      profileImageSrc: string): Promise<void> {
    this.ensureIsLoaded();
    this._diningEvent.removeSeat(accountId, accountName, profileImageSrc);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: DiningEvent;
}
