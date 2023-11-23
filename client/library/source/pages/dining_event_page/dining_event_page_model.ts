import { DiningEvent } from '../../definitions';
import { DiningEventCheckoutModel } from
  '../../modals/dining_event_checkout_modal';

/** Base class for the model used by the DiningEventPage. */
export abstract class DiningEventPageModel {
  /**
   * Loads the data to display on the DiningEventPage.
   * Must be called before calling any other method of this class.
   */
  public abstract load(): Promise<void>;
  public abstract get diningEvent(): DiningEvent;
  public abstract getCheckoutModel(): DiningEventCheckoutModel;
  public abstract removeSeat(accountId: number, accountName: string,
    profileImageSrc: string): Promise<void>;
}
