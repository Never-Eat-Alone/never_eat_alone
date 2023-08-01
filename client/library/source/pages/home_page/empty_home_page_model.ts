import { EventCardSummary, EventTag, SocialMediaImage } from
  '../../definitions';
import { HomePageModel } from './home_page_model';

/**
 * Implements a HomePageModel that always fails. Can be used as the initial
 * state of a model prior to being loaded.
 */
export class EmptyHomePageModel extends HomePageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public async updateEventLists(): Promise<void> {
    throw new Error('Unable to update empty model.');
  }

  public get imageList(): SocialMediaImage[] {
    throw new Error('HomePageModel not loaded.');
  }

  public get upcomingEventList(): EventCardSummary[] {
    throw new Error('HomePageModel not loaded.');
  }

  public get pastEventList(): EventCardSummary[] {
    throw new Error('HomePageModel not loaded.');
  }

  public get userEventTagList(): EventTag[] {
    throw new Error('HomePageModel not loaded.');
  }

  public get userFutureEventList(): EventCardSummary[] {
    throw new Error('HomePageModel not loaded.');
  }

  public get userTotalEventsThisMonth(): number {
    throw new Error('HomePageModel not loaded.');
  }
}
