import { DiningEvent } from '../../definitions';
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

  public async joinEvent(): Promise<boolean> {
    return true;
  }

  public async removeSeat(): Promise<boolean> {
    return true;
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
