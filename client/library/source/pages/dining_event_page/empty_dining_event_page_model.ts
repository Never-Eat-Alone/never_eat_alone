import { DiningEvent } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/**
 * Implements a DiningEventPageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyDiningEventPageModel extends DiningEventPageModel {
  public async load(eventId: number): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get diningEvent(): DiningEvent {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public async joinEvent(): Promise<void> {
    throw new Error('Unable to join event from empty model.');
  }

  public async removeSeat(): Promise<void> {
    throw new Error('Unable to remove seat from empty model.');
  }
}