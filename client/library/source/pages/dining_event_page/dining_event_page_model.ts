import { DiningEvent } from '../../definitions';

/** Base class for the model used by the DiningEventPage. */
export abstract class DiningEventPageModel {
  /**
   * Loads the data to display on the DiningEventPage.
   * Must be called before calling any other method of this class.
   */
  public abstract load(): Promise<void>;
  public abstract get diningEvent(): DiningEvent;
  public abstract joinEvent(accountId: number, accountName: string,
    profileImageSrc: string): Promise<void>;
  public abstract removeSeat(accountId: number, accountName: string,
    profileImageSrc: string): Promise<void>;
}
