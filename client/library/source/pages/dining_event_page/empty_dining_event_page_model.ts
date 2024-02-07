import { DiningEvent } from '../../definitions';
import { DiningEventCheckoutModel } from
  '../../modals/dining_event_checkout_modal';
import { DiningEventPageModel } from './dining_event_page_model';

/**
 * Implements a DiningEventPageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyDiningEventPageModel extends DiningEventPageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get diningEvent(): DiningEvent {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public getCheckoutModel(): DiningEventCheckoutModel {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public async removeSeat(accountId: number, accountName: string,
      profileImageSrc: string): Promise<void> {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public async validatePaymentAndJoinEvent(sessionId: string): Promise<void> {
    throw new Error('DiningEventPageModel not loaded.');
  }
}
