import { EventCardSummary, EventTag, SocialMediaImage } from
  '../../definitions';

/** Base class for the model used by the HomePage. */
export abstract class HomePageModel {
  /** Loads the data to display on the HomePage, must be called before calling
   * any other method of this class.
   */
  public abstract load(): Promise<void>;
  public abstract get imageList(): SocialMediaImage[];
  public abstract get upcomingEventList(): EventCardSummary[];
  public abstract get pastEventList(): EventCardSummary[];
  public abstract get userEventTagList(): EventTag[];
  public abstract get userFutureEventList(): EventCardSummary[];
  public abstract get userTotalEventsThisMonth(): number;
  public abstract updateEventLists(): Promise<void>;
}
