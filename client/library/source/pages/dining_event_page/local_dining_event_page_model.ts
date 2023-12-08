import { DiningEvent } from '../../definitions';
import { DiningEventCheckoutModel } from
  '../../modals/dining_event_checkout_modal';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(diningEvent: DiningEvent, checkoutModel:
      DiningEventCheckoutModel) {
    super();
    this._isLoaded = false;
    this._diningEvent = diningEvent;
    this._checkoutModel = checkoutModel;
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

  public getCheckoutModel(): DiningEventCheckoutModel {
    this.ensureIsLoaded();
    return this._checkoutModel;
  }

  public async removeSeat(accountId: number, accountName: string,
      profileImageSrc: string): Promise<void> {
    this.ensureIsLoaded();
    this._diningEvent.removeSeat(accountId, accountName, profileImageSrc);
  }

  public async validatePaymentAndJoinEvent(): Promise<void> {}

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: DiningEvent;
  private _checkoutModel: DiningEventCheckoutModel;
}
