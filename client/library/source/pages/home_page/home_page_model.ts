import { EventCardSummary, EventTag, SocialMediaImage
} from '../../definitions';

/** Base class for the model used by the HomePage. */
export abstract class HomePageModel {
  /** Loads the data to display on the HomePage, must be called before calling
   * any other method of this class.
   */
  public abstract load(): Promise<void>;
  public abstract getImageList(): SocialMediaImage[];
  public abstract getEventList(): EventCardSummary[];
  public abstract getEventTagList(): EventTag[];
  public abstract getUserFutureEventList(): EventCardSummary[];
  public abstract getTotalEventsThisMonth(): number;
}
